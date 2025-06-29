import { Container, Paper, Stack } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/query';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import QuestionsFilters from '../components/QuestionsFilters';
import {
  useGetSkillsQuery,
  useGetSpecializationsQuery,
} from '../features/questions/questionsApi';

function Layout() {
  const [debouncedValue, setDebouncedValue] = useState('');
  const [selectedSpecializationId, setSelectedSpecializationId] = useState(11);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedRates, setSelectedRates] = useState([]);
  const [selectedComplexityRange, setSelectedComplexityRange] = useState(null);

  const { data, isLoading, isError } = useGetSpecializationsQuery();
  const specializations = data?.data || [];

  const {
    data: skillsData,
    isLoading: skillsLoading,
    isError: skillsError,
  } = useGetSkillsQuery(
    selectedSpecializationId
      ? {
          page: 1,
          limit: 50,
          specializations: String(selectedSpecializationId),
        }
      : skipToken
  );

  const skills = skillsData?.data || [];

  return (
    <Container sx={{ mt: 4 }}>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        {/* Content */}
        <Paper
          elevation={3}
          sx={{ flex: 3, p: 2, borderRadius: 2, backgroundColor: '#fff' }}
        >
          <Outlet
            context={{
              searchValue: debouncedValue,
              specializationId: selectedSpecializationId,
              skills: selectedSkills,
              rates: selectedRates,
              complexityRange: selectedComplexityRange,
            }}
          />
        </Paper>

        {/* Filters Sidebar */}
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
          <QuestionsFilters
            setDebouncedValue={setDebouncedValue}
            selectedSpecializationId={selectedSpecializationId}
            setSelectedSpecializationId={setSelectedSpecializationId}
            selectedSkills={selectedSkills}
            setSelectedSkills={setSelectedSkills}
            selectedRates={selectedRates}
            setSelectedRates={setSelectedRates}
            selectedComplexityRange={selectedComplexityRange}
            setSelectedComplexityRange={setSelectedComplexityRange}
            specializations={specializations}
            skills={skills}
            skillsLoading={skillsLoading}
            skillsError={skillsError}
            specializationsLoading={undefined}
            specializationsError={undefined}
          />
        </Paper>
      </Stack>
    </Container>
  );
}

export default Layout;
