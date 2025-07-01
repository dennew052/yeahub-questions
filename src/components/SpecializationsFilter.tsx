import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';

import type { Specialization } from './types';

interface Props {
  specializations: Specialization[];
  selectedId: number | null;
  loading: boolean;
  error: boolean;
  onSelect: (id: number) => void;
}

export default function SpecializationsFilter({
  specializations,
  selectedId,
  loading,
  error,
  onSelect,
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
    return <Typography color="error">Ошибка загрузки специализаций</Typography>;
  }

  return (
    <>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Специализация:
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
        {(showAll ? specializations : specializations.slice(0, 5)).map(
          (spec) => (
            <Button
              key={spec.id}
              variant={selectedId === spec.id ? 'contained' : 'outlined'}
              size="small"
              onClick={() => onSelect(spec.id)}
            >
              {spec.title}
            </Button>
          )
        )}
      </Box>
      {specializations.length > 5 && (
        <Button size="small" onClick={() => setShowAll((prev) => !prev)}>
          {showAll ? 'Скрыть' : 'Подробнее'}
        </Button>
      )}
    </>
  );
}
