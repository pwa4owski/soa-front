import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TablePerson from "./components/TablePerson";
import AdditionalForms from "./components/AdditionalForms";

export default function App() {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <TablePerson />
        <AdditionalForms />
      </Box>
    </Container>
  );
}
