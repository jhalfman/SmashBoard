import React from 'react';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const PlayerStats = ({rulesList}) => {
    const [errors, setErrors] = useState(null)
    const [playerCharacters, setPlayerCharacters] = useState([])
    let navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        fetch(`/players/${id}`)
        .then(resp => {
            if (resp.ok) {
                resp.json().then(pcs => {
                  setPlayerCharacters(pcs)
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
      <button onClick={() => navigate(`/stats`)}>Back to Stats</button>
    </div>
  )
}

export default PlayerStats