'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface HelpTooltipProps {
  content: string;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

const sizeConfig = {
  xs: 'h-3 w-3',
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4'
};

/**
 * A small help icon (?) that shows a Korean tooltip on hover.
 * Use this to explain metrics and fields to users.
 */
export function HelpTooltip({
  content,
  size = 'sm',
  className,
  side = 'top'
}: HelpTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className='inline-flex cursor-help'>
          <HelpCircle
            className={cn(
              sizeConfig[size],
              'text-muted-foreground hover:text-foreground shrink-0',
              className
            )}
          />
        </span>
      </TooltipTrigger>
      <TooltipContent
        side={side}
        sideOffset={8}
        className='z-[100] max-w-[280px]'
      >
        <p className='text-sm'>{content}</p>
      </TooltipContent>
    </Tooltip>
  );
}

/**
 * Korean tooltip descriptions for various metrics
 */
export const METRIC_TOOLTIPS = {
  // Outlier metrics
  outlierScore:
    '조회수/구독자 비율, 참여도, 업로드 시점을 종합한 점수입니다. 높을수록 해당 채널에서 성과가 좋은 영상입니다.',
  zScore:
    '통계적 표준편차 점수입니다. 2.0 이상이면 상위 2.5%, 3.0 이상이면 상위 0.1%에 해당합니다.',
  percentileRank:
    '채널 내 전체 영상 중 이 영상의 순위입니다. Top 1%면 가장 성과가 좋은 상위 1%에 해당합니다.',
  channelMultiplier:
    '채널 평균 성과 대비 이 영상의 성과 배율입니다. 3.0x면 평균보다 3배 잘한 것입니다.',
  viewToSubRatio:
    '구독자 대비 조회수 비율입니다. 100%면 구독자 수만큼 조회됨, 200%면 구독자의 2배가 조회한 것입니다.',

  // Tier
  tier: '영상의 성과 등급입니다. Z-Score 기반으로 Mega(상위 0.1%) > High > Moderate > Low > Minimal 순입니다.',

  // Format
  format:
    '영상 형식입니다. Shorts는 60초 이하 세로 영상, Long-form은 일반 영상입니다. 각각 별도 통계로 분석됩니다.',

  // Basic metrics
  views: '영상의 총 조회수입니다.',
  subscribers: '영상 업로드 당시 채널의 구독자 수입니다.',
  likes: '영상에 달린 좋아요 수입니다.',
  comments: '영상에 달린 댓글 수입니다.',
  published: '영상이 업로드된 시점입니다.',

  // Power Words
  powerWords:
    '제목에 포함된 감정 유발 단어입니다. 클릭률(CTR)을 높이는 효과가 있습니다.',

  // Stats cards
  totalOutliers: '기준(Z-Score ≥ 2.0)을 넘는 성과 좋은 영상의 총 개수입니다.',
  megaOutliers:
    'Z-Score 3.0 이상의 폭발적인 성과를 보인 영상입니다. 상위 0.1%에 해당합니다.',
  avgOutlierScore:
    '모든 Outlier 영상의 평균 점수입니다. 높을수록 전체적으로 성과가 좋습니다.',
  newThisWeek: '최근 7일 이내에 새로 Outlier로 탐지된 영상 수입니다.',

  // Score breakdown
  viewContribution: '조회수/구독자 비율이 전체 점수에 기여한 비율입니다.',
  engagementContribution:
    '좋아요/댓글 등 참여도가 전체 점수에 기여한 비율입니다.',
  timeContribution: '업로드 시점(최신성)이 전체 점수에 기여한 비율입니다.'
} as const;
