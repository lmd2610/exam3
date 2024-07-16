import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { post } from '../../utils/axios';

interface Column {
  id: 'username' | 'password';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'username', label: 'Username', minWidth: 170 },
  { id: 'password', label: 'Password', minWidth: 100 },

];






export default function ListUser() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [count, setCount] = React.useState(0)
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);

  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);

  };
  const listUser = (data: any) => {
    let result = post('http://localhost:5000/api/users', data)
    return result.then((rs) => {
      console.log(rs)
      setRows(rs.data);
      setCount(rs.count)
      return rs.data;
    })


  };
  React.useEffect(() => {
    listUser({ page: page, limit: rowsPerPage });

  }, [page, rowsPerPage]);
  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>

            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{  minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          
          </TableHead>
        
          <TableBody>
            {rows
              .slice(0, rows.length < rowsPerPage ? rows.length : rowsPerPage)
              .map((row: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
