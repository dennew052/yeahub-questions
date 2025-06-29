import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const questionsApi = createApi({
  reducerPath: 'questionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: (builder) => ({
    getPublicQuestions: builder.query({
      query: ({
        page = 1,
        limit = 10,
        title = '',
        skillFilterMode = '',
        specialization = '',
        skills = '',
        rate = '',
        complexity = '',
      }) => {
        const params = new URLSearchParams({ page, limit });

        if (title) params.append('title', title);
        if (skillFilterMode) params.append('skillFilterMode', skillFilterMode);
        if (specialization) params.append('specialization', specialization);
        if (skills) params.append('skills', skills);
        if (rate) params.append('rate', rate);
        if (complexity) params.append('complexity', complexity);

        return `questions/public-questions?${params.toString()}`;
      },
    }),
    getSpecializations: builder.query({
      query: (limit = 50) => `specializations?limit=${limit}`,
    }),
    getSkills: builder.query({
      query: ({ page = 1, limit = 10, specializations = '' }) => {
        const params = new URLSearchParams({ page, limit });

        if (specializations) params.append('specializations', specializations);

        return `skills?${params.toString()}`;
      },
    }),
  }),
});

export const {
  useGetPublicQuestionsQuery,
  useGetSpecializationsQuery,
  useGetSkillsQuery,
} = questionsApi;
