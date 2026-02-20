'use client';

import { BookOpen, Layers, FileText, Target, Brain, ChevronRight } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Curriculum, Chapter, Section, Topic, LearningObjective, BloomLevel } from '@/entities/curriculum';

const BLOOM_COLORS: Record<BloomLevel, string> = {
  REMEMBER: 'bg-slate-100 text-slate-700',
  UNDERSTAND: 'bg-blue-100 text-blue-700',
  APPLY: 'bg-green-100 text-green-700',
  ANALYZE: 'bg-yellow-100 text-yellow-700',
  EVALUATE: 'bg-orange-100 text-orange-700',
  CREATE: 'bg-purple-100 text-purple-700',
};

const BLOOM_LABELS: Record<BloomLevel, string> = {
  REMEMBER: '기억',
  UNDERSTAND: '이해',
  APPLY: '적용',
  ANALYZE: '분석',
  EVALUATE: '평가',
  CREATE: '창조',
};

function ObjectiveItem({ objective }: { objective: LearningObjective }) {
  return (
    <div className="flex items-start gap-2 py-1.5 pl-2">
      <Brain className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />
      <span className="text-sm">{objective.description}</span>
      <Badge
        variant="secondary"
        className={cn('ml-auto shrink-0 text-xs', BLOOM_COLORS[objective.bloomLevel])}
      >
        {BLOOM_LABELS[objective.bloomLevel]}
      </Badge>
    </div>
  );
}

function TopicNode({ topic }: { topic: Topic }) {
  const objectiveCount = topic.objectives?.length ?? 0;
  const hasChildren = objectiveCount > 0;

  if (!hasChildren) {
    return (
      <div className="flex items-center gap-2 py-1.5 pl-2">
        <Target className="h-4 w-4 shrink-0 text-emerald-500" />
        <span className="text-sm">{topic.name}</span>
      </div>
    );
  }

  return (
    <Collapsible>
      <CollapsibleTrigger className="group flex w-full items-center gap-2 rounded-md py-1.5 pl-2 hover:bg-accent">
        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-90" />
        <Target className="h-4 w-4 shrink-0 text-emerald-500" />
        <span className="text-sm">{topic.name}</span>
        <Badge variant="outline" className="ml-auto text-xs">
          {objectiveCount}
        </Badge>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="ml-6 border-l pl-3">
          {topic.objectives?.map((obj) => (
            <ObjectiveItem key={obj.id} objective={obj} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function SectionNode({ section }: { section: Section }) {
  const hasChildren = (section.topics?.length ?? 0) > 0;

  if (!hasChildren) {
    return (
      <div className="flex items-center gap-2 py-1.5 pl-2">
        <FileText className="h-4 w-4 shrink-0 text-amber-500" />
        <span className="text-sm font-medium">{section.name}</span>
      </div>
    );
  }

  return (
    <Collapsible>
      <CollapsibleTrigger className="group flex w-full items-center gap-2 rounded-md py-1.5 pl-2 hover:bg-accent">
        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-90" />
        <FileText className="h-4 w-4 shrink-0 text-amber-500" />
        <span className="text-sm font-medium">{section.name}</span>
        <Badge variant="outline" className="ml-auto text-xs">
          {section.topics?.length}개 토픽
        </Badge>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="ml-6 border-l pl-3">
          {section.topics?.map((topic) => (
            <TopicNode key={topic.id} topic={topic} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function ChapterNode({ chapter }: { chapter: Chapter }) {
  const hasChildren = (chapter.sections?.length ?? 0) > 0;

  if (!hasChildren) {
    return (
      <div className="flex items-center gap-2 py-2 pl-2">
        <Layers className="h-4 w-4 shrink-0 text-blue-500" />
        <span className="font-medium">{chapter.name}</span>
      </div>
    );
  }

  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger className="group flex w-full items-center gap-2 rounded-md py-2 pl-2 hover:bg-accent">
        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-90" />
        <Layers className="h-4 w-4 shrink-0 text-blue-500" />
        <span className="font-medium">{chapter.name}</span>
        <Badge variant="outline" className="ml-auto text-xs">
          {chapter.sections?.length}개 섹션
        </Badge>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="ml-6 border-l pl-3">
          {chapter.sections?.map((section) => (
            <SectionNode key={section.id} section={section} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

interface CurriculumTreeProps {
  curriculum: Curriculum;
}

export function CurriculumTree({ curriculum }: CurriculumTreeProps) {
  const chapters = curriculum.chapters ?? [];

  if (chapters.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        등록된 챕터가 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div className="mb-3 flex items-center gap-2 px-2">
        <BookOpen className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">{curriculum.name}</h3>
      </div>
      <div className="space-y-0.5">
        {chapters.map((chapter) => (
          <ChapterNode key={chapter.id} chapter={chapter} />
        ))}
      </div>
    </div>
  );
}
