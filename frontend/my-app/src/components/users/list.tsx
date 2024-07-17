import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { post } from 'src/utils/axios';

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
  const [rows, setRows] = React.useState<any[]>([]);
  const [count, setCount] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [totalPage, setTotalPage] = React.useState(0)
  const loadMore = () => {
    if(page>=totalPage) return;
    setLoading(true);
    setPage(page + 1);
  }
  const listUser = (data: any) => {
    let result = post('http://localhost:5000/api/users', data)
    return result.then((rs) => {
      setRows((rows) => [...rows, ...rs.data])
      setLoading(false)
      setTotalPage(rs.totalPageCount)
      return rs.data;
    })


  };
  React.useEffect(() => {
    listUser({ page: page, limit: rowsPerPage });

  }, [page]);
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
      <div
        style={{
          padding: '2rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        
        <button disabled={loading} onClick={loadMore} hidden={page<totalPage?false:true}>
          {loading ? 'Loading...' : 'Press to load more'}
        </button>
      </div>
    </Paper>
  );
}
