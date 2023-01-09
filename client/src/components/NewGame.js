import React from 'react'
import {useEffect, useState} from 'react'

const NewGame = () => {
    //time, notes, night_id
    const [newGameForm, setNewGameForm] = useState({
        time: 0,
        notes: "",
        p1: null,
        p2: null,
        p3: null,
        p4: null
    })

    useEffect(() => {
      setNewGameForm({...newGameForm})
    }, [newGameForm])
    
  return (
    <div>{newGameForm}</div>
  )
}

export default NewGame