import { Box, Button, Typography } from '@mui/material';

interface Props {
  selectedRates: number[];
  onToggle: (rate: number) => void;
}

export default function RatesFilter({ selectedRates, onToggle }: Props) {
  return (
    <>
      <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
        Рейтинг:
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {[1, 2, 3, 4, 5].map((rate) => (
          <Button
            key={rate}
            variant={selectedRates.includes(rate) ? 'contained' : 'outlined'}
            onClick={() => onToggle(rate)}
            size="small"
          >
            {rate}
          </Button>
        ))}
      </Box>
    </>
  );
}
