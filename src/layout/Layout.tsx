import { Container, Paper, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

import QuestionsFilters from '../components/QuestionsFilters';

function Layout() {
  return (
    <Container sx={{ mt: 4 }}>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Paper
          elevation={3}
          sx={{ flex: 3, p: 2, borderRadius: 2, backgroundColor: '#fff' }}
        >
          <Outlet />
        </Paper>

        <Paper
          elevation={3}
          sx={{
            flex: 1,
            p: 2,
            borderRadius: 2,
            backgroundColor: '#fff',
            minWidth: 250,
          }}
        >
          <QuestionsFilters />
        </Paper>
      </Stack>
    </Container>
  );
}

export default Layout;
