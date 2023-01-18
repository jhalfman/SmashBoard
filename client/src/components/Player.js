import React from 'react'
import {useState} from 'react'

const Player = ({player, setPlayers, players}) => {
    const [editPlayerNameForm, setEditPlayerNameForm] = useState({
        name: player.name
    })
    const [editorOn, setEditorOn] = useState(false)
    const [errors, setErrors] = useState(null)

    function editPlayerName(name) {
        setEditorOn(true)
    }

    function updatePlayerNameForm(e) {
        setEditPlayerNameForm({name: e.target.value})
    }

    function cancelEdit() {
        setEditorOn(false)
        setEditPlayerNameForm({name: player.name})
    }
    
    function submitPlayerName(e) {
        e.preventDefault();
        fetch(`/players/${player.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editPlayerNameForm)
        })
        .then(resp => {
            if (resp.ok) {
                resp.json().then(player => {
                    const newPlayers = players.map(p => {
                        if (p.id === player.id) {
                            return player
                        }
                        else 
                            return p
                    })
                    setPlayers(newPlayers)
                })
            }
            else {
                resp.json().then(data => {
                    console.log(data)
                    const errors = Object.entries(data.errors).map(error => `${error[0]} ${error[1]}`)
                    setErrors(errors)
                })
            }
        })
    }

    function retirePlayer() {
        fetch(`/players/${player.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"retired": true})
        })
        .then(resp => {
            if (resp.ok) {
                resp.json().then(player => {
                    const newPlayers = players.filter(p => {
                        return p.id !== player.id
                    })
                    setPlayers(newPlayers)
                })
            }
            else {
                resp.json().then(data => {
                    const errors = Object.entries(data.errors).map(error => `${error[0]} ${error[1]}`)
                    setErrors(errors)
                })
            }
        })
    }

    const username = <div>
        {player.name[0].toUpperCase() + player.name.slice(1)} <button onClick={() => editPlayerName(player.name)}>Edit Name</button>
    </div>

    const editUsername = <form onSubmit={submitPlayerName}>
        <input type="text" value={editPlayerNameForm.name} onChange={updatePlayerNameForm}></input>
        <button>Submit</button>
        <button type="button" onClick={cancelEdit}>Cancel</button>
        <button type="button" onClick={retirePlayer}>Retire</button>
    </form>

  return (
    <>
    {errors ? errors.map(error => <div className="errors" key={error}>{error}</div>) : null}
    {editorOn ? editUsername : username}
    </>
  )
}

export default Player