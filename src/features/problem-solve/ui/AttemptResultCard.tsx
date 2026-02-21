'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, Loader2, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import type { AttemptResult } from '@/entities/problem';

interface AttemptResultCardProps {
  result: AttemptResult;
  solution?: unknown;
  answer?: unknown;
}

export function AttemptResultCard({
  result,
  solution,
  answer,
}: AttemptResultCardProps) {
  const [solutionOpen, setSolutionOpen] = useState(false);

  const isCorrect = result.isCorrect === true;
  const isWrong = result.isCorrect === false;
  const isPending = result.isCorrect === null;

  return (
    <Card
      role="alert"
      aria-live="polite"
      className={`overflow-hidden transition-transform duration-200 ${
        isCorrect
          ? 'border-success/30 bg-success/10'
          : isWrong
            ? 'border-destructive/30 bg-destructive/10'
            : 'border-warning/30 bg-warning/10'
      } ${isCorrect ? 'animate-in zoom-in-95 duration-300' : ''}`}
    >
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          {isCorrect && <CheckCircle2 aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-success" />}
          {isWrong && <XCircle aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-destructive" />}
          {isPending && <Loader2 aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 animate-spin text-warning" />}

          <div className="flex-1 space-y-2">
            <p className={`text-lg font-semibold ${
              isCorrect ? 'text-success' : isWrong ? 'text-destructive' : 'text-warning'
            }`}>
              {isCorrect && '정답입니다!'}
              {isWrong && '오답입니다.'}
              {isPending && '서술형 문제는 수동 채점이 필요합니다.'}
            </p>

            <div className={`flex items-center gap-4 text-sm ${
              isCorrect ? 'text-success/80' : isWrong ? 'text-destructive/80' : 'text-warning/80'
            }`}>
              <span>시도 #{result.attemptNumber}</span>
              <span>소요시간: {result.timeTaken}초</span>
            </div>

            {/* 오답 시 정답 공개 */}
            {isWrong && answer != null && (
              <div className="mt-3 rounded-md border border-destructive/20 bg-card/60 p-3">
                <p className="text-sm font-medium text-destructive">정답</p>
                <p className="mt-1 text-sm text-destructive/80 whitespace-pre-wrap">
                  {String(answer)}
                </p>
              </div>
            )}

            {/* 오답 시 풀이 공개 (접기/펼치기) */}
            {isWrong && solution != null && (
              <Collapsible open={solutionOpen} onOpenChange={setSolutionOpen}>
                <CollapsibleTrigger className="mt-2 flex items-center gap-1 text-sm font-medium text-destructive/80 hover:text-destructive">
                  풀이 보기
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${solutionOpen ? 'rotate-180' : ''}`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <div className="rounded-md border border-destructive/20 bg-card/60 p-3">
                    <p className="text-sm text-destructive/80 whitespace-pre-wrap">
                      {String(solution)}
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
