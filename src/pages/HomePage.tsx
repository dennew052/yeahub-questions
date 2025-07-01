import { useSelector } from 'react-redux';

import QuestionsList from '../components/QuestionsList';
import { selectQuestionsQueryParams } from '../features/filters/filtersSlice';
import { useGetPublicQuestionsQuery } from '../features/questions/questionsApi';

function HomePage() {
  const queryParams = useSelector(selectQuestionsQueryParams);


  const { data, isLoading, isError } = useGetPublicQuestionsQuery({
    ...queryParams,
    page: 1,
    limit: 10,
  });

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка загрузки вопросов</div>;

  return <QuestionsList questions={data?.data || []} />;
}

export default HomePage;
