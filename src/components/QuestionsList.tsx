import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import type { QuestionsListProps } from './types';

function QuestionsList({ questions, isLoading, error }: QuestionsListProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Alert severity="error">
        Ошибка: {error.message || 'Ошибка запроса'}
      </Alert>
    );
  }

  if (!questions.length) {
    return <Alert severity="info">Ничего не найдено</Alert>;
  }

  return (
    <>
      {questions.map((question) => (
        <Accordion
          key={question.id}
          sx={{
            mb: 2,
            borderRadius: 2,
            boxShadow: 3,
            '&:before': { display: 'none' },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: '#6A0BFF' }} />}
          >
            <Typography variant="h6">{question.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div
              dangerouslySetInnerHTML={{ __html: question.shortAnswer }}
              style={{ marginBottom: '1rem' }}
            />
            <Button
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate(`/questions/${question.id}`)}
              sx={{ float: 'right' }}
            >
              Подробнее
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}

export default QuestionsList;
