'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useMyProgress, getMasteryLevel, masteryColor } from '@/entities/progress';
import { MasteryBadge } from './MasteryBadge';

export function ProgressChart() {
  const { data: progressList, isLoading, error } = useMyProgress();

  return (
    <Card>
      <CardHeader>
        <CardTitle>토픽별 숙달도</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-2 w-full" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && (error || !progressList) && (
          <p className="text-sm text-muted-foreground">
            데이터를 불러올 수 없습니다.
          </p>
        )}

        {!isLoading && progressList && progressList.length === 0 && (
          <p className="text-sm text-muted-foreground">
            아직 학습 기록이 없습니다.
          </p>
        )}

        {!isLoading && progressList && progressList.length > 0 && (
          <TooltipProvider>
            <div className="space-y-4">
              {progressList.map((progress) => {
                const percent = Math.round(progress.masteryLevel * 100);
                const mastery = getMasteryLevel(progress.masteryLevel);
                const barColor = masteryColor(mastery);

                return (
                  <div key={progress.id} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {progress.topic?.name ?? progress.topicId}
                      </span>
                      <div className="flex items-center gap-2">
                        <MasteryBadge level={progress.masteryLevel} />
                        <span className="text-xs text-muted-foreground">
                          {percent}%
                        </span>
                      </div>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Progress
                            value={percent}
                            className="h-2"
                            indicatorClassName={barColor}
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          정답률: {percent}% ({progress.correctCount}/
                          {progress.problemsSolved})
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                );
              })}
            </div>
          </TooltipProvider>
        )}
      </CardContent>
    </Card>
  );
}
