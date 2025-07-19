import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';

interface TableUIProps {
  loading: boolean;
  error: string | null;
  labels: string[];
  values1: number[];
  values2: number[];
}

function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>) {
  return arrLabels.map((label, index) => ({
    id: index,
    label: label,
    value1: arrValues1[index],
    value2: arrValues2[index]
  }));
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'label',
    headerName: 'Hora',
    width: 180,
  },
  {
    field: 'value1',
    headerName: 'Temperatura (°C)',
    width: 180,
  },
  {
    field: 'value2',
    headerName: 'Velocidad viento (km/h)',
    width: 200,
  },
];

export default function TableUI({ loading, error, labels, values1, values2 }: TableUIProps) {
  if (loading) return <Typography>Cargando tabla...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!labels.length || !values1.length || !values2.length) return <Typography>No hay datos para mostrar.</Typography>;

  const rows = combineArrays(labels, values1, values2);

  return (
    <Box sx={{ height: 350, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}