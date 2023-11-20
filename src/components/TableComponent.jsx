import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
export default function BasicTable({data}) {
  return (
    <TableContainer>
    <Table>
        <TableHead>
          <TableRow sx= {{backgroundColor: "#FFFAF8"}}>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Ranking</TableCell>
            <TableCell align="center">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.cle}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#FFFAF8" }}
            >
              <TableCell align="center">{row.cle}</TableCell>
              <TableCell align="center">{row.classement}</TableCell>
              <TableCell align="center">{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}