import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { NavLink as Link} from 'react-router-dom';
import {useEffect, useState} from 'react';


export default function NightsTable({setNightName}) {

  const [nights, setNights] = useState([])

    useEffect(() => {
        fetch("/nights")
        .then(resp => resp.json())
        .then(data => setNights(data))
      }, [])

  function createData(name, user, date, time, games, id) {
    return { name, user, date, time, games, id};
  }
  
  const nightRows = nights.map(night => {
    const parsedDate = night.created_at.split("T")
    return createData(night.name, night.user.username, parsedDate[0], parsedDate[1].slice(0,8), night.games.length, night.id)
  })

  

  return (
    <div>
    <Link to="/nights/new"><Button variant="contained" color="success">Create New Game Night</Button></Link>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Event Name</TableCell>
            <TableCell align="right">Created By</TableCell>
            <TableCell align="right">Creation Date</TableCell>
            <TableCell align="right">Game Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nightRows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <Link style={{color:"blue"}} to={`/nights/${row.id}`} onClick={() => setNightName(row.name)}>{row.name}</Link>
              </TableCell>
              <TableCell align="right">{row.user}</TableCell>
              <TableCell align="right">{row.date} @ {row.time}</TableCell>
              <TableCell align="right">{row.games}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
