import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetPublicQuestionByIdQuery } from '../features/questions/questionsApi';

function QuestionPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: question,
    isLoading,
    error,
  } = useGetPublicQuestionByIdQuery(id ?? '');

  return (
    <Container sx={{ mt: 4 }}>
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        ← Назад
      </Button>

      {isLoading && <CircularProgress />}
      {error && (
        <Alert severity="error">
          Ошибка: {'status' in error ? error.status : 'Ошибка запроса'}
        </Alert>
      )}
      {!question && !isLoading && !error && (
        <Alert severity="info">Вопрос не найден</Alert>
      )}

      {question && (
        <>
          <Typography variant="h4" gutterBottom>
            {question.title}
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: question.longAnswer }} />
        </>
      )}
    </Container>
  );
}

export default QuestionPage;
