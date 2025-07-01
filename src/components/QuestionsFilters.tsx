import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '../app/store';
import {
  setComplexityRange,
  setRates,
  setSearchValue,
  setSkills,
  setSpecializationId,
} from '../features/filters/filtersSlice';
import {
  useGetSkillsQuery,
  useGetSpecializationsQuery,
} from '../features/questions/questionsApi';
import QuestionSearchBar from './QuestionSearchBar';
import type { Skill, Specialization } from './types';

function QuestionsFilters() {
  const dispatch = useDispatch();

  const {
    searchValue,
    specializationId,
    skills: selectedSkills,
    rates: selectedRates,
    complexityRange,
  } = useSelector((state: RootState) => state.filters);

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
    specializationId
      ? {
          page: 1,
          limit: 50,
          specializations: String(specializationId),
        }
      : undefined,
    {
      skip: !specializationId,
    }
  );

  const skills = skillsData?.data || [];

  const [showAllSpecializations, setShowAllSpecializations] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);

  const handleSearchChange = (value: string) => {
    dispatch(setSearchValue(value));
  };

  const handleSpecializationSelect = (id: number) => {
    dispatch(setSpecializationId(id));
  };

  const toggleItemInArray = (array: number[], value: number) =>
    array.includes(value)
      ? array.filter((v) => v !== value)
      : [...array, value];

  const handleSkillToggle = (id: number) => {
    dispatch(setSkills(toggleItemInArray(selectedSkills, id)));
  };

  const handleRateToggle = (rate: number) => {
    dispatch(setRates(toggleItemInArray(selectedRates, rate)));
  };

  const handleComplexitySelect = (range: number[]) => {
    if (complexityRange?.join(',') === range.join(',')) {
      dispatch(setComplexityRange(null));
    } else {
      dispatch(setComplexityRange(range));
    }
  };

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <QuestionSearchBar
          onDebouncedChange={handleSearchChange}
          value={searchValue}
        />
      </Box>

      {/* Специализации */}
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Специализация:
      </Typography>
      {specializationsLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
          <CircularProgress size={24} />
        </Box>
      ) : specializationsError ? (
        <Typography color="error">Ошибка загрузки специализаций</Typography>
      ) : (
        <>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
            {(showAllSpecializations
              ? specializations
              : specializations.slice(0, 5)
            ).map((spec: Specialization) => (
              <Button
                key={spec.id}
                variant={
                  specializationId === spec.id ? 'contained' : 'outlined'
                }
                size="small"
                onClick={() => handleSpecializationSelect(spec.id)}
              >
                {spec.title}
              </Button>
            ))}
          </Box>
          {specializations.length > 5 && (
            <Button
              size="small"
              onClick={() => setShowAllSpecializations((prev) => !prev)}
            >
              {showAllSpecializations ? 'Скрыть' : 'Подробнее'}
            </Button>
          )}
        </>
      )}

      {/* Скилы */}
      <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
        Скилы:
      </Typography>
      {skillsLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
          <CircularProgress size={24} />
        </Box>
      ) : skillsError ? (
        <Typography color="error">Ошибка загрузки скилов</Typography>
      ) : (
        <>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
            {(showAllSkills ? skills : skills.slice(0, 5)).map(
              (skill: Skill) => (
                <Button
                  key={skill.id}
                  variant={
                    selectedSkills.includes(skill.id) ? 'contained' : 'outlined'
                  }
                  size="small"
                  onClick={() => handleSkillToggle(skill.id)}
                >
                  {skill.title}
                </Button>
              )
            )}
          </Box>
          {skills.length > 5 && (
            <Button
              size="small"
              onClick={() => setShowAllSkills((prev) => !prev)}
            >
              {showAllSkills ? 'Скрыть' : 'Подробнее'}
            </Button>
          )}
        </>
      )}

      {/* Рейтинг */}
      <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
        Рейтинг:
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {[1, 2, 3, 4, 5].map((rate) => (
          <Button
            key={rate}
            variant={selectedRates.includes(rate) ? 'contained' : 'outlined'}
            onClick={() => handleRateToggle(rate)}
            size="small"
          >
            {rate}
          </Button>
        ))}
      </Box>

      {/* Сложность */}
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Сложность:
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {[
          [1, 2, 3],
          [4, 5, 6],
          [7, 8],
          [9, 10],
        ].map((range, idx) => (
          <Button
            key={idx}
            variant={
              complexityRange?.join(',') === range.join(',')
                ? 'contained'
                : 'outlined'
            }
            onClick={() => handleComplexitySelect(range)}
            size="small"
          >
            {range.join('-')}
          </Button>
        ))}
      </Box>
    </>
  );
}

export default QuestionsFilters;
