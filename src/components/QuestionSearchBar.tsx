import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

function QuestionSearchBar({ onDebouncedChange }) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      onDebouncedChange(inputValue);
    }, 400);
    return () => clearTimeout(timeout);
  }, [inputValue, onDebouncedChange]);

  const handleClear = () => {
    setInputValue('');
  };

  return (
    <TextField
      placeholder="Поиск по названию"
      variant="outlined"
      fullWidth
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '12px',
          backgroundColor: '#f9f9f9',
          paddingRight: 1,
          '& fieldset': {
            borderColor: '#ddd',
          },
          '&:hover fieldset': {
            borderColor: '#aaa',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#6A0BFF',
          },
        },
      }}
      InputProps={{
        endAdornment: inputValue && (
          <InputAdornment position="end">
            <IconButton onClick={handleClear} size="small">
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default QuestionSearchBar;
