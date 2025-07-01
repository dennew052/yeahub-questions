import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';

import type { Skill } from './types';

interface Props {
  skills: Skill[];
  selectedSkills: number[];
  loading: boolean;
  error: boolean;
  onToggle: (id: number) => void;
}

export default function SkillsFilter({
  skills,
  selectedSkills,
  loading,
  error,
  onToggle,
}: Props) {
  const [showAll, setShowAll] = useState(false);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Ошибка загрузки скилов</Typography>;
  }

  return (
    <>
      <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
        Скилы:
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
        {(showAll ? skills : skills.slice(0, 5)).map((skill) => (
          <Button
            key={skill.id}
            variant={
              selectedSkills.includes(skill.id) ? 'contained' : 'outlined'
            }
            size="small"
            onClick={() => onToggle(skill.id)}
          >
            {skill.title}
          </Button>
        ))}
      </Box>
      {skills.length > 5 && (
        <Button size="small" onClick={() => setShowAll((prev) => !prev)}>
          {showAll ? 'Скрыть' : 'Подробнее'}
        </Button>
      )}
    </>
  );
}
