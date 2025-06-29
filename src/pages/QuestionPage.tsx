import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

import { useGetPublicQuestionsQuery } from '../features/questions/questionsApi';

function QuestionPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { searchValue, specializationId, skills, rates, complexityRange } =
    useOutletContext();

  const queryParams = {
    page: 1,
    limit: 50,
    title: searchValue,
    specialization: specializationId,
  };

  if (skills?.length > 0) {
    queryParams.skills = skills.join(',');
  }

  if (rates?.length > 0) {
    queryParams.rate = rates.join(',');
  }

  if (complexityRange?.length > 0) {
    queryParams.complexity = complexityRange.join(',');
  }

  const {
    data: questions,
    isLoading,
    error,
  } = useGetPublicQuestionsQuery(queryParams);

  const question = questions?.data?.find((q) => q.id === Number(id));

  return (
    <Container sx={{ mt: 4 }}>
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        ← Назад
      </Button>

      {isLoading && <CircularProgress />}
      {error && <Alert severity="error">Ошибка: {error.message}</Alert>}
      {!question && !isLoading && (
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
