import { configureStore } from '@reduxjs/toolkit';

import { questionsApi } from '../features/questions/questionsApi';

export const store = configureStore({
  reducer: {
    [questionsApi.reducerPath]: questionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(questionsApi.middleware),
});
