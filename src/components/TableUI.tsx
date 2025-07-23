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
  {
    field: 'label',
    headerName: 'Fecha y Hora', // Changed header name to reflect full date and time
    width: 200, // Increased width to accommodate full date and time
    headerAlign: 'left',
    align: 'left',
    sortable: false,
    disableColumnMenu: true,
    valueFormatter: (params) => {
      const dateTime = new Date(params);
      const year = dateTime.getFullYear();
      const month = String(dateTime.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
      const day = String(dateTime.getDate()).padStart(2, '0');
      const hours = String(dateTime.getHours()).padStart(2, '0');
      const minutes = String(dateTime.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}`; // Format as YYYY-MM-DD HH:MM
    }
  },
  {
    field: 'value1',
    headerName: 'Temperatura (°C)',
    width: 180,
    headerAlign: 'left',
    align: 'left',
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: 'value2',
    headerName: 'Velocidad viento (km/h)',
    width: 200,
    headerAlign: 'left',
    align: 'left',
    sortable: false,
    disableColumnMenu: true,
  },
];

export default function TableUI({ loading, error, labels, values1, values2 }: TableUIProps) {
  if (loading) return <Typography>Cargando tabla...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!labels.length || !values1.length || !values2.length) return <Typography>No hay datos para mostrar.</Typography>;

  const rows = combineArrays(labels, values1, values2);

  return (
    <Box sx={{
      height: 390,
      width: '100%',
      '.MuiDataGrid-root': {
        border: 'none',
        boxShadow: 'none',
        borderRadius: 2,
        background: '#fff',
      },
      '.MuiDataGrid-columnHeaders': {
        backgroundColor: '#f8f8f8',
        borderBottom: '1px solid #e0e0e0',
        borderRadius: '8px 8px 0 0',
        borderTop: 'none',
      },
      '.MuiDataGrid-columnHeaderTitle': {
        fontWeight: 600,
        color: '#333',
      },
      '.MuiDataGrid-cell': {
        borderBottom: '1px solid #f0f0f0',
        paddingY: '8px',
      },
      '.MuiDataGrid-row': {
        '&:last-child .MuiDataGrid-cell': {
          borderBottom: 'none',
        },
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
      },
      '.MuiDataGrid-footerContainer': {
        display: 'none',
      },
      // Remove the ID column visually
      '.MuiDataGrid-columnHeader:first-of-type, .MuiDataGrid-cell:first-of-type': {
        visibility: 'hidden',
        width: '0px !important',
        maxWidth: '0px !important',
        minWidth: '0px !important',
      },
    }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        hideFooter
        rowHeight={48}
      />
    </Box>
  );
}