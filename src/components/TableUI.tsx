import { 
  Box, 
  Paper, 
  Typography, 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
  Chip,
  TableContainer
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface TableUIProps {
  loading: boolean;
  error: string | null;
  labels: string[];
  values1: number[];
  values2: number[];
}

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  border: '1px solid #f0f0f0',
  overflow: 'hidden',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: '#f8fafc',
  '& .MuiTableCell-head': {
    fontWeight: 600,
    color: '#374151',
    borderBottom: '1px solid #e5e7eb',
    padding: '16px 12px',
    fontSize: '0.875rem',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: '#f9fafb',
  },
  '&:last-child td': {
    borderBottom: 0,
  },
  transition: 'background-color 0.2s ease',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: '1px solid #f3f4f6',
  padding: '12px',
  fontSize: '0.875rem',
}));

const TemperatureChip = styled(Chip)(({ theme }) => ({
  backgroundColor: '#dbeafe',
  color: '#1e40af',
  fontWeight: 600,
  minWidth: '56px',
  '& .MuiChip-label': {
    padding: '4px 8px',
  },
}));

function prepareTableData(labels: string[], values1: number[], values2: number[]) {
  // Tomar solo las primeras 12 horas como en el diseño de referencia
  return labels.slice(0, 12).map((label, index) => ({
    time: new Date(label).toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    }),
    temperature: values1[index]?.toFixed(1) || '0.0',
    windSpeed: values2[index]?.toFixed(1) || '0.0',
  }));
}

export default function TableUI({ loading, error, labels, values1, values2 }: TableUIProps) {
  if (loading) {
    return (
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <Typography>Cargando tabla...</Typography>
      </Paper>
    );
  }
  
  if (error) {
    return (
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <Typography color="error">Error: {error}</Typography>
      </Paper>
    );
  }
  
  if (!labels.length || !values1.length || !values2.length) {
    return (
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <Typography>No hay datos para mostrar.</Typography>
      </Paper>
    );
  }

  const tableData = prepareTableData(labels, values1, values2);

  return (
    <Paper sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
      <Box sx={{ p: 3, pb: 2 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 700, color: '#111827', mb: 0 }}>
          Pronóstico por Horas
        </Typography>
      </Box>
      
      <StyledTableContainer>
        <Table size="small">
          <StyledTableHead>
            <TableRow>
              <TableCell align="center">Hora</TableCell>
              <TableCell align="center">Temperatura</TableCell>
              <TableCell align="center">Viento</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">
                  <Typography sx={{ fontWeight: 500, color: '#111827' }}>
                    {row.time}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TemperatureChip
                    label={`${row.temperature}°C`}
                    size="small"
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Typography sx={{ color: '#6b7280' }}>
                    {row.windSpeed} km/h
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Paper>
  );
}