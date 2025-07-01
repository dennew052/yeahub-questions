import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';

interface FiltersState {
  searchValue: string;
  specializationId: number | null;
  skills: number[];
  rates: number[];
  complexityRange: number[] | null;
}

const initialState: FiltersState = {
  searchValue: '',
  specializationId: 11,
  skills: [],
  rates: [],
  complexityRange: null,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSpecializationId(state, action: PayloadAction<number | null>) {
      state.specializationId = action.payload;
      state.skills = [];
    },
    setSkills(state, action: PayloadAction<number[]>) {
      state.skills = action.payload;
    },
    setRates(state, action: PayloadAction<number[]>) {
      state.rates = action.payload;
    },
    setComplexityRange(state, action: PayloadAction<number[] | null>) {
      state.complexityRange = action.payload;
    },
    resetFilters(state) {
      state.searchValue = '';
      state.specializationId = 11;
      state.skills = [];
      state.rates = [];
      state.complexityRange = null;
    },
  },
});

export const selectFilters = (state: RootState) => state.filters;

export const selectQuestionsQueryParams = (state: RootState) => {
  const filters = state.filters;
  return {
    page: 1,
    limit: 10,
    title: filters.searchValue,
    specialization: filters.specializationId
      ? String(filters.specializationId)
      : '',
    skills: filters.skills.length ? filters.skills.join(',') : '',
    rate: filters.rates.length ? filters.rates.join(',') : '',
    complexity: filters.complexityRange
      ? filters.complexityRange.join(',')
      : '',
    skillFilterMode: 'all',
  };
};

export const {
  setSearchValue,
  setSpecializationId,
  setSkills,
  setRates,
  setComplexityRange,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
