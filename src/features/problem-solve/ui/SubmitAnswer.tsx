'use client';

import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSubmitAttempt } from '@/entities/problem';
import type { AttemptResult } from '@/entities/problem';

interface SubmitAnswerProps {
  problemId: string;
  answer: unknown;
  getTimeTaken: () => number;
  disabled?: boolean;
  onResult: (result: AttemptResult) => void;
}

export function SubmitAnswer({
  problemId,
  answer,
  getTimeTaken,
  disabled,
  onResult,
}: SubmitAnswerProps) {
  const mutation = useSubmitAttempt();

  const handleSubmit = () => {
    mutation.reset();
    mutation.mutate(
      { problemId, submittedAnswer: answer, timeTaken: getTimeTaken() },
      { onSuccess: (data) => onResult(data) },
    );
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={handleSubmit}
        disabled={disabled || mutation.isPending || answer == null || answer === ''}
        className="w-full sm:w-auto"
      >
        {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {mutation.isPending ? '채점 중...' : '제출하기'}
      </Button>

      {mutation.isError && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          제출 중 오류가 발생했습니다. 다시 시도해주세요.
        </div>
      )}
    </div>
  );
}
