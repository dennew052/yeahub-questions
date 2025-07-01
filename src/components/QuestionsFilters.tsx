import { useSelector } from 'react-redux';

import type { RootState } from '../app/store';
import {
  useGetSkillsQuery,
  useGetSpecializationsQuery,
} from '../services/questionsApi';
import ComplexityFilter from './ComplexityFilter';
import useFiltersHandlers from './hooks/useFiltersHandlers';
import QuestionSearchBar from './QuestionSearchBar';
import RatesFilter from './RatesFilter';
import SkillsFilter from './SkillsFilter';
import SpecializationsFilter from './SpecializationsFilter';

export default function QuestionsFilters() {
  const filters = useSelector((state: RootState) => state.filters);

  const {
    handleSearchChange,
    handleSpecializationSelect,
    handleSkillToggle,
    handleRateToggle,
    handleComplexitySelect,
  } = useFiltersHandlers(filters);

  const {
    data: specializationsData,
    isLoading: specializationsLoading,
    isError: specializationsError,
  } = useGetSpecializationsQuery(50);
  const specializations = specializationsData?.data || [];

  const {
    data: skillsData,
    isLoading: skillsLoading,
    isError: skillsError,
  } = useGetSkillsQuery(
    filters.specializationId
      ? {
          page: 1,
          limit: 50,
          specializations: String(filters.specializationId),
        }
      : undefined,
    { skip: !filters.specializationId }
  );
  const skills = skillsData?.data || [];

  return (
    <>
      <QuestionSearchBar
        value={filters.searchValue}
        onDebouncedChange={handleSearchChange}
      />

      <SpecializationsFilter
        specializations={specializations}
        selectedId={filters.specializationId}
        loading={specializationsLoading}
        error={specializationsError}
        onSelect={handleSpecializationSelect}
      />

      <SkillsFilter
        skills={skills}
        selectedSkills={filters.skills}
        loading={skillsLoading}
        error={skillsError}
        onToggle={handleSkillToggle}
      />

      <RatesFilter selectedRates={filters.rates} onToggle={handleRateToggle} />

      <ComplexityFilter
        complexityRange={filters.complexityRange}
        onSelect={handleComplexitySelect}
      />
    </>
  );
}
