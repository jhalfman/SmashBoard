import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PopoutText from './PopoutText';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const PlayerStats = ({ruleList}) => {
    const [errors, setErrors] = useState(null)
    const [statboard, setStatboard] = useState(null)
    const [player, setPlayer] = useState([])
    let navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        fetch(`/players/${id}`)
        .then(resp => {
            if (resp.ok) {
                resp.json().then(player => {
                  setPlayer(player)

                  const newStatboard = {}
                  newStatboard[0] = [`${player.name} (Lifetime)`, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                  player.player_characters.forEach(pc => {
                      newStatboard[pc.id] = [pc.character.name, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                      pc.penalties.forEach(penalty => {
                              newStatboard[pc.id][penalty.rule_id] += 1
                              newStatboard[pc.id][18] += 1
                              newStatboard[0][penalty.rule_id] += 1
                              newStatboard[0][18] += 1
                          })
                  })
                  setStatboard(newStatboard)
                })
            }
            else {
                resp.json().then(data => {
                    const errors = Object.entries(data.errors).map(error => `${error[0]} ${error[1]}`)
                    setErrors(errors)
                  })
            }
        })
    }, [id])
    
  return (
    <div>
      {errors ? errors.map(error => <div className="errors" key={error}>{error}</div>) : null}
      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell ><img alt="smash logo" id="smashLogo" src="https://i.imgur.com/Ovx4ThS.png" style={{width: 80}}/></TableCell>
                  {ruleList.map(rule => {
                      return <TableCell key={rule.id}>
                          <PopoutText rule={rule}/>
                          </TableCell>
                  })}
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
              key={player.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {statboard ? statboard[0].map((tally, index) => {
                  return <TableCell style={{fontWeight: "900"}} component="th" scope="row" key={player.name + index} className="statCell">{tally}</TableCell>
                }) : null}
              </TableRow>
              {statboard ? player.player_characters.map(pc => {
                return <TableRow
                key={pc.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                {statboard[pc.id].map((tally, index) => {
                  return <TableCell component="th" scope="row" key={index} className="statCell">{tally}</TableCell>
                })}
                </TableRow>
              }) : null}
              <TableRow></TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div>Character %:</div>
        <div># of games: {console.log(player)}</div>
      <button onClick={() => navigate(`/stats`)}>Back to Stats</button>
    </div>
  )
}

export default PlayerStats