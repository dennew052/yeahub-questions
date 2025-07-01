import { Box, Button, Typography } from '@mui/material';

interface Props {
  complexityRange: number[] | null;
  onSelect: (range: number[]) => void;
}

const complexityOptions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8],
  [9, 10],
];

export default function ComplexityFilter({ complexityRange, onSelect }: Props) {
  return (
    <>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Сложность:
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {complexityOptions.map((range, idx) => (
          <Button
            key={idx}
            variant={
              complexityRange?.join(',') === range.join(',')
                ? 'contained'
                : 'outlined'
            }
            onClick={() => onSelect(range)}
            size="small"
          >
            {range.join('-')}
          </Button>
        ))}
      </Box>
    </>
  );
}
