import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { NavLink as Link} from 'react-router-dom';
import {useEffect, useState} from 'react';


export default function SessionsTable() {

  const [sessions, setSessions] = useState([])

    useEffect(() => {
        fetch("/sessions")
        .then(resp => resp.json())
        .then(data => setSessions(data))
      }, [])

  function createData(name, user, date, games, id) {
    return { name, user, date, games, id};
  }
  
  const sessionRows = sessions.map(session => {
    return createData(session.name, session.user.username, session.created_at, session.games.length, session.id)
  })

  

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Session Name</TableCell>
            <TableCell align="right">Created By</TableCell>
            <TableCell align="right">Creation Date</TableCell>
            <TableCell align="right">Game Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sessionRows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <Link style={{color:"blue"}} to={`/sessions/${row.id}`}>{row.name}</Link>
              </TableCell>
              <TableCell align="right">{row.user}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.games}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
