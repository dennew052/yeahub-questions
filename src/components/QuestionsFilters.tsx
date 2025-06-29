import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';

import QuestionSearchBar from './QuestionSearchBar';

function QuestionsFilters({
  setDebouncedValue,
  selectedSpecializationId,
  setSelectedSpecializationId,
  selectedSkills,
  setSelectedSkills,
  selectedRates,
  setSelectedRates,
  selectedComplexityRange,
  setSelectedComplexityRange,
  specializations,
  skills,
  specializationsLoading,
  specializationsError,
  skillsLoading,
  skillsError,
}) {
  const [showAllSpecializations, setShowAllSpecializations] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);

  const toggleItemInArray = (array, value) =>
    array.includes(value)
      ? array.filter((id) => id !== value)
      : [...array, value];

  const handleSkillToggle = (id) => {
    setSelectedSkills(toggleItemInArray(selectedSkills, id));
  };

  const handleRateToggle = (rate) => {
    setSelectedRates(toggleItemInArray(selectedRates, rate));
  };

  const handleComplexitySelect = (range) => {
    setSelectedComplexityRange(
      selectedComplexityRange?.join(',') === range.join(',') ? null : range
    );
  };

  return (
    <>
      <Box sx={{ mb: 2 }}>
        {/* Поиск */}
        <QuestionSearchBar onDebouncedChange={setDebouncedValue} />
      </Box>

      {/* Специализация */}
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
            ).map((spec) => (
              <Button
                key={spec.id}
                variant={
                  selectedSpecializationId === spec.id
                    ? 'contained'
                    : 'outlined'
                }
                size="small"
                onClick={() => setSelectedSpecializationId(spec.id)}
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
            {(showAllSkills ? skills : skills.slice(0, 5)).map((skill) => (
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
            ))}
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
              selectedComplexityRange?.join(',') === range.join(',')
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
