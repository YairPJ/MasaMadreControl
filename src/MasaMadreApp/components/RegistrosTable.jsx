import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import { useSelector } from 'react-redux';

const columns = [
  {
    width: 100,
    label: 'Masa',
    dataKey: 'masa',
  },
  {
    width: 100,
    label: 'INICIO PREVISTA',
    dataKey: 'inicioPrevisto',
  },
  {
    width: 100,
    label: 'INICIO',
    dataKey: 'inicio',
  },
  {
    width: 100,
    label: 'FINALIZACION',
    dataKey: 'horaFinalizacion',
  },
  {
    width: 100,
    label: 'DURACION',
    dataKey: 'duracion',
  },
  {
    width: 100,
    label: 'COMENTARIO',
    dataKey: 'comentario',
  },
  {
    width: 100,
    label: 'Estatus',
    dataKey: 'estatus',
  },
];

  
const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

export default function RegistrosTable() {
  const { registros } = useSelector(state => state.masaMadre);



  function fixedHeaderContent() {
    return (
      <TableRow >
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            sx={{ borderColor: '#E6E6E6', backgroundColor: '#E6E6E6' }}
            align="left"
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }
  

  function rowContent(_index, row) {
    const rowStyle = {
      backgroundColor: row.estatus === 'ERROR' ? '#DA2E00' : row.estatus === 'Finalizado' ? '#3FAB01': row.estatus === 'En Proceso...' ? '#0497DC': 'white',
    };
  
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            sx={{
              backgroundColor: rowStyle.backgroundColor,
              borderColor: 'black',
            }}
            align={'left'}
          >
            {row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }
  

  // Mapea los datos para que coincidan con las propiedades de 'columns'
  const mappedRegistros = registros.map((registro) => ({
    masa: registro.Masa, // Ajusta las propiedades según corresponda
    inicioPrevisto: registro.HoraDeInicioPrevista,
    inicio: registro.HoraDeInicio,
    horaFinalizacion: registro.HoraDeFinalizacion,
    duracion: registro.Duracion,
    comentario: registro.Comentario,
    estatus: registro.Estatus,
  }));
  

  return (
    <Paper style={{ height: 500, width: '100%' }}>
      <TableVirtuoso
        data={mappedRegistros} // Utiliza los datos mapeados
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
