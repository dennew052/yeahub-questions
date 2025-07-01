export interface User {
  id: string;
  username: string;
}

export interface QuestionSpecialization {
  id: number;
  title: string;
  description: string;
  imageSrc: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionSkill {
  id: number;
  title: string;
  description: string;
  imageSrc: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: number;
  title: string;
  description: string;
  code: string | null;
  imageSrc: string | null;
  keywords: string[];
  longAnswer: string;
  shortAnswer: string;
  status: string; // например, "public"
  rate: number;
  complexity: number;
  createdAt: string;
  updatedAt: string;
  createdById: string;
  updatedById: string;
  createdBy: User;
  updatedBy: User;
  questionSpecializations: QuestionSpecialization[];
  questionSkills: QuestionSkill[];
}

export interface Specialization {
  id: number;
  title: string;
}

export interface Skill {
  id: number;
  title: string;
}

export interface GetPublicQuestionsParams {
  page?: number;
  limit?: number;
  title?: string;
  skillFilterMode?: string;
  specialization?: string;
  skills?: string;
  rate?: string;
  complexity?: string;
}

export interface QuestionsResponse {
  data: Question[];
  total: number;
  page: number;
  limit: number;
}

export interface QuestionsListProps {
  questions: Question[];
  isLoading?: boolean;
  error?: any;
}
