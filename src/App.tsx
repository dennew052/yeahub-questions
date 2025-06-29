import { Route, Routes } from 'react-router-dom';

import Layout from './layout/Layout';
import HomePage from './pages/HomePage';
import QuestionPage from './pages/QuestionPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="questions/:id" element={<QuestionPage />} />
      </Route>
    </Routes>
  );
}

export default App;
