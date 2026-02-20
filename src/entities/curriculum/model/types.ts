export const BloomLevel = {
  REMEMBER: 'REMEMBER',
  UNDERSTAND: 'UNDERSTAND',
  APPLY: 'APPLY',
  ANALYZE: 'ANALYZE',
  EVALUATE: 'EVALUATE',
  CREATE: 'CREATE',
} as const;
export type BloomLevel = (typeof BloomLevel)[keyof typeof BloomLevel];

export interface LearningObjective {
  id: string;
  description: string;
  bloomLevel: BloomLevel;
  createdAt: string;
  updatedAt: string;
}

export interface Topic {
  id: string;
  name: string;
  orderIndex: number;
  objectives?: LearningObjective[];
  createdAt: string;
  updatedAt: string;
}

export interface Section {
  id: string;
  name: string;
  orderIndex: number;
  topics?: Topic[];
  createdAt: string;
  updatedAt: string;
}

export interface Chapter {
  id: string;
  name: string;
  orderIndex: number;
  sections?: Section[];
  createdAt: string;
  updatedAt: string;
}

export interface Curriculum {
  id: string;
  name: string;
  grade: number;
  semester: number;
  subject: string;
  orderIndex: number;
  chapters?: Chapter[];
  createdAt: string;
  updatedAt: string;
}

export interface CurriculumListParams {
  grade?: number;
  semester?: number;
}
