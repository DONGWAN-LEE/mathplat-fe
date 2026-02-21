'use client';

import { useState, useRef, useEffect } from 'react';
import { Clock, BarChart3, Lightbulb, ChevronDown, RotateCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { AnswerInput, SubmitAnswer, AttemptResultCard } from '@/features/problem-solve';
import {
  useMyProblemAttempts,
  problemTypeLabel,
  difficultyLabel,
  difficultyColor,
} from '@/entities/problem';
import type { ProblemDetail, AttemptResult } from '@/entities/problem';
import { formatDate } from '@/shared/lib/format';

interface ProblemSolverProps {
  problem: ProblemDetail;
}

export function ProblemSolver({ problem }: ProblemSolverProps) {
  const [answer, setAnswer] = useState<unknown>(null);
  const [result, setResult] = useState<AttemptResult | null>(null);
  const startTimeRef = useRef(Date.now());
  const { data: attempts } = useMyProblemAttempts(problem.id);
  const [hintsOpen, setHintsOpen] = useState(false);

  useEffect(() => {
    setAnswer(null);
    setResult(null);
    startTimeRef.current = Date.now();
  }, [problem.id]);

  const getTimeTaken = () => Math.floor((Date.now() - startTimeRef.current) / 1000);

  const handleRetry = () => {
    setAnswer(null);
    setResult(null);
    startTimeRef.current = Date.now();
  };

  const hasHints = problem.hints != null && (
    (Array.isArray(problem.hints) && problem.hints.length > 0) ||
    (typeof problem.hints === 'string' && problem.hints.length > 0)
  );

  return (
    <div className="space-y-6">
      {/* 메타 정보 */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary">{problemTypeLabel(problem.type)}</Badge>
        <Badge variant="outline" className={difficultyColor(problem.difficulty)}>
          난이도 {problem.difficulty} · {difficultyLabel(problem.difficulty)}
        </Badge>
        <span className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          예상 {problem.estimatedTime}분
        </span>
        <span className="flex items-center gap-1 text-sm text-muted-foreground">
          <BarChart3 className="h-3.5 w-3.5" />
          정답률 {problem.correctRate}%
        </span>
      </div>

      {/* 문제 내용 */}
      <Card>
        <CardHeader className="pb-3">
          <h2 className="text-lg font-semibold">문제</h2>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none whitespace-pre-wrap">
            {problem.content}
          </div>
        </CardContent>
      </Card>

      {/* 힌트 */}
      {hasHints && (
        <Collapsible open={hintsOpen} onOpenChange={setHintsOpen}>
          <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            <Lightbulb className="h-4 w-4" />
            힌트 보기
            <ChevronDown
              className={`h-4 w-4 transition-transform ${hintsOpen ? 'rotate-180' : ''}`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <Card className="border-warning/20 bg-warning/5">
              <CardContent className="pt-4">
                <div className="text-sm whitespace-pre-wrap">
                  {Array.isArray(problem.hints)
                    ? problem.hints.map((hint, i) => (
                        <p key={i} className="mb-1">
                          {i + 1}. {String(hint)}
                        </p>
                      ))
                    : String(problem.hints)}
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* 채점 결과 피드백 */}
      {result && (
        <div className="space-y-3">
          <AttemptResultCard
            result={result}
            solution={problem.solution}
            answer={problem.answer}
          />
          <Button variant="outline" onClick={handleRetry} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            다시 풀기
          </Button>
        </div>
      )}

      {/* 답안 입력 (결과 없을 때만 표시) */}
      {!result && (
        <Card>
          <CardHeader className="pb-3">
            <h2 className="text-lg font-semibold">답안 입력</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <AnswerInput type={problem.type} value={answer} onChange={setAnswer} />
            <SubmitAnswer
              problemId={problem.id}
              answer={answer}
              getTimeTaken={getTimeTaken}
              onResult={setResult}
            />
          </CardContent>
        </Card>
      )}

      {/* 이전 풀이 이력 */}
      {attempts && attempts.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <h2 className="text-lg font-semibold">풀이 이력</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {attempts.map((attempt) => (
                <div
                  key={attempt.id}
                  className="flex items-center justify-between rounded-lg border p-3 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium">#{attempt.attemptNumber}</span>
                    <span
                      className={
                        attempt.isCorrect === true
                          ? 'text-success'
                          : attempt.isCorrect === false
                            ? 'text-destructive'
                            : 'text-warning'
                      }
                    >
                      {attempt.isCorrect === true
                        ? '정답'
                        : attempt.isCorrect === false
                          ? '오답'
                          : '채점 중'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <span>{attempt.timeTaken}초</span>
                    <span>{formatDate(attempt.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
