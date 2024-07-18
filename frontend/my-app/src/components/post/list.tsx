import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InfiniteScroll from 'react-infinite-scroll-component';
import { post } from '../../utils/axios';

interface Column {
  id: 'title' | 'content' | 'tag';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
  witdhInfiniteScroll?: number
}

const columns: Column[] = [
  { id: 'title', label: 'Title', minWidth: 200, witdhInfiniteScroll: 430 },
  { id: 'content', label: 'Content', minWidth: 200, witdhInfiniteScroll: 430 },
  {
    id: 'tag',
    label: 'Tag',
    minWidth: 170,
    witdhInfiniteScroll: 340
  }
];
export default function ListPost() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState<any[]>([]);
  const [totalCount, setTotalCount] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [totalPage, setTotalPage] = React.useState(0)

  const listPost = () => {
    let result = post('http://localhost:5000/api/posts', { page: page, limit: rowsPerPage })
    result.then((rs) => {
      setRows((rows) => [...rows, ...rs.data])

      setTotalPage(rs.totalPageCount)
      setTotalCount(rs.totalCount)
      setPage(page + 1);
    })
  };
  React.useEffect(() => {
    listPost();
  }, []);
  return (
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table" >
        <TableHead>

          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>

        </TableHead>

      </Table>
      <InfiniteScroll
        dataLength={rows.length}
        next={listPost}
        hasMore={rows.length < totalCount}
        loader={<h4>Loading.....</h4>}
        endMessage={
          <p>het roif</p>
        }
        height={390}
      >
        {rows
          .slice(0, page * rowsPerPage + rowsPerPage)
          .map((row: any) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.witdhInfiniteScroll }}>
                      {column.format && typeof value === 'number'
                        ? column.format(value)
                        : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
      </InfiniteScroll>
    </TableContainer>
  );
}
