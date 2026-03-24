'use client';

import { useSyncExternalStore } from 'react';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function formatDate(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
}

function emptySubscribe() {
  return () => {};
}

export function Greeting() {
  const greeting = useSyncExternalStore(
    emptySubscribe,
    getGreeting,
    () => 'Welcome back'
  );
  const date = useSyncExternalStore(emptySubscribe, formatDate, () => '');

  return (
    <div>
      <h2 className='text-2xl font-bold tracking-tight'>
        {greeting} <span className='inline-block'>👋</span>
      </h2>
      {date && <p className='text-muted-foreground mt-0.5 text-sm'>{date}</p>}
    </div>
  );
}
