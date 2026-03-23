'use client';

/**
 * useProgressStream Hook
 *
 * A reusable hook for consuming SSE (Server-Sent Events) progress streams.
 * Provides real-time progress updates for long-running operations.
 */

import { useState, useCallback, useRef } from 'react';

export interface ProgressEvent {
  phase: string;
  status: 'start' | 'progress' | 'complete' | 'error';
  current: number;
  total: number;
  percentage: number;
  message: string;
  details?: Record<string, unknown>;
}

export type StreamStatus =
  | 'idle'
  | 'connecting'
  | 'streaming'
  | 'complete'
  | 'error';

interface UseProgressStreamOptions {
  onProgress?: (event: ProgressEvent) => void;
  onComplete?: (event: ProgressEvent) => void;
  onError?: (error: Error) => void;
}

interface UseProgressStreamReturn {
  startStream: (
    url: string,
    options?: RequestInit
  ) => Promise<ProgressEvent | null>;
  cancelStream: () => void;
  status: StreamStatus;
  latestEvent: ProgressEvent | null;
  events: ProgressEvent[];
  error: Error | null;
}

export function useProgressStream(
  options: UseProgressStreamOptions = {}
): UseProgressStreamReturn {
  const { onProgress, onComplete, onError } = options;

  const [status, setStatus] = useState<StreamStatus>('idle');
  const [latestEvent, setLatestEvent] = useState<ProgressEvent | null>(null);
  const [events, setEvents] = useState<ProgressEvent[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const cancelStream = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setStatus('idle');
  }, []);

  const startStream = useCallback(
    async (
      url: string,
      fetchOptions?: RequestInit
    ): Promise<ProgressEvent | null> => {
      // Cancel any existing stream
      cancelStream();

      // Reset state
      setStatus('connecting');
      setLatestEvent(null);
      setEvents([]);
      setError(null);

      // Create new abort controller
      abortControllerRef.current = new AbortController();

      let finalEvent: ProgressEvent | null = null;

      try {
        const response = await fetch(url, {
          ...fetchOptions,
          signal: abortControllerRef.current.signal
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('No reader available');
        }

        setStatus('streaming');

        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();

          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          // Parse SSE events
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const event: ProgressEvent = JSON.parse(line.slice(6));

                setLatestEvent(event);
                setEvents((prev) => [...prev, event]);

                if (event.status === 'error') {
                  const err = new Error(event.message);
                  setError(err);
                  onError?.(err);
                  continue;
                }

                if (event.status === 'complete') {
                  finalEvent = event;
                  onComplete?.(event);
                } else {
                  onProgress?.(event);
                }
              } catch {
                // Ignore parse errors
              }
            }
          }
        }

        setStatus('complete');
        return finalEvent;
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          setStatus('idle');
          return null;
        }

        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        setStatus('error');
        onError?.(error);
        throw error;
      }
    },
    [cancelStream, onProgress, onComplete, onError]
  );

  return {
    startStream,
    cancelStream,
    status,
    latestEvent,
    events,
    error
  };
}
