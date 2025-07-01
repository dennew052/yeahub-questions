import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
  setComplexityRange,
  setRates,
  setSearchValue,
  setSkills,
  setSpecializationId,
} from '../../features/filters/filtersSlice';
import type { FiltersState } from '../types';

export default function useFiltersHandlers(filters: FiltersState) {
  const dispatch = useDispatch();

  const toggleItemInArray = useCallback(
    (array: number[], value: number) =>
      array.includes(value)
        ? array.filter((v) => v !== value)
        : [...array, value],
    []
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      dispatch(setSearchValue(value));
    },
    [dispatch]
  );

  const handleSpecializationSelect = useCallback(
    (id: number) => {
      dispatch(setSpecializationId(id));
      dispatch(setSkills([]));
    },
    [dispatch]
  );

  const handleSkillToggle = useCallback(
    (id: number) => {
      dispatch(setSkills(toggleItemInArray(filters.skills, id)));
    },
    [dispatch, filters.skills, toggleItemInArray]
  );

  const handleRateToggle = useCallback(
    (rate: number) => {
      dispatch(setRates(toggleItemInArray(filters.rates, rate)));
    },
    [dispatch, filters.rates, toggleItemInArray]
  );

  const handleComplexitySelect = useCallback(
    (range: number[]) => {
      if (filters.complexityRange?.join(',') === range.join(',')) {
        dispatch(setComplexityRange(null));
      } else {
        dispatch(setComplexityRange(range));
      }
    },
    [dispatch, filters.complexityRange]
  );

  return {
    handleSearchChange,
    handleSpecializationSelect,
    handleSkillToggle,
    handleRateToggle,
    handleComplexitySelect,
  };
}
