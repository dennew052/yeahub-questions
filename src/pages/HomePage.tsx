import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  CircularProgress,
  Container,
  Pagination,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import { useGetPublicQuestionsQuery } from '../features/questions/questionsApi';

function HomePage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { searchValue, specializationId, skills, rates, complexityRange } =
    useOutletContext();

  const params = {
    page,
    limit: 10,
    title: searchValue,
    specialization: specializationId,
    skillFilterMode: skills.length ? 'ANY' : '',
    skills: skills.length ? skills.join(',') : undefined,
    rate: rates.length ? rates.join(',') : undefined,
    complexity: complexityRange ? complexityRange.join(',') : undefined,
  };

  Object.keys(params).forEach(
    (key) => params[key] === undefined && delete params[key]
  );

  const { data, isLoading, error } = useGetPublicQuestionsQuery(params);

  useEffect(() => {
    setPage(1);
  }, [searchValue, specializationId, skills, rates, complexityRange]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const total = data?.total || 0;
  const totalPages = Math.ceil(total / 10);

  return (
    <Container sx={{ mt: 4 }}>
      {isLoading && <CircularProgress />}
      {error && (
        <Alert severity="error">
          Ошибка: {error.message || 'Ошибка запроса'}
        </Alert>
      )}
      {!isLoading && data?.data?.length === 0 && (
        <Alert severity="info">Ничего не найдено</Alert>
      )}

      {data?.data?.map((question) => (
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

      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
        />
      )}
    </Container>
  );
}

export default HomePage;
