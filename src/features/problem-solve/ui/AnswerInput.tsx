'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ProblemType } from '@/entities/problem';

interface AnswerInputProps {
  type: ProblemType;
  value: unknown;
  onChange: (v: unknown) => void;
}

const CHOICE_OPTIONS = [
  { value: '1', label: '1번' },
  { value: '2', label: '2번' },
  { value: '3', label: '3번' },
  { value: '4', label: '4번' },
  { value: '5', label: '5번' },
];

const TRUE_FALSE_OPTIONS = [
  { value: 'true', label: '참 (O)' },
  { value: 'false', label: '거짓 (X)' },
];

export function AnswerInput({ type, value, onChange }: AnswerInputProps) {
  switch (type) {
    case ProblemType.MULTIPLE_CHOICE:
      return (
        <RadioGroup
          value={value != null ? String(value) : ''}
          onValueChange={(v) => onChange(v)}
        >
          {CHOICE_OPTIONS.map((opt) => (
            <div key={opt.value} className="flex items-center space-x-2">
              <RadioGroupItem value={opt.value} id={`choice-${opt.value}`} />
              <Label htmlFor={`choice-${opt.value}`} className="cursor-pointer">
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      );

    case ProblemType.TRUE_FALSE:
      return (
        <RadioGroup
          value={value != null ? String(value) : ''}
          onValueChange={(v) => onChange(v)}
        >
          {TRUE_FALSE_OPTIONS.map((opt) => (
            <div key={opt.value} className="flex items-center space-x-2">
              <RadioGroupItem value={opt.value} id={`tf-${opt.value}`} />
              <Label htmlFor={`tf-${opt.value}`} className="cursor-pointer">
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      );

    case ProblemType.ESSAY:
      return (
        <Textarea
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="답안을 입력하세요..."
          rows={6}
          className="resize-y"
        />
      );

    case ProblemType.SHORT_ANSWER:
    case ProblemType.FILL_IN_BLANK:
    default:
      return (
        <Input
          type="text"
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="답을 입력하세요"
        />
      );
  }
}
