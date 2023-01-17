import React, { useEffect } from 'react';
import {useState} from 'react';

const Penalty = ({penalty, players, ruleList, submitPenaltyForm}) => {
    const [playerName, setPlayerName] = useState("")
    const [characterName, setCharacterName] = useState("")
    const [ruleName, setRuleName] = useState("")
    const [editPenaltyForm, setEditPenaltyForm] = useState({
        player_character_id: penalty.player_character_id,
        rule_id: penalty.rule_id,
        description: penalty.description
    })
    const [penaltyEditorOn, setPenaltyEditorOn] = useState(false)
    console.log(penalty)

    useEffect(() => {
        const player = players.find(pc => pc.id === penalty.player_character_id).player.name
        setPlayerName(player)

        const character = players.find(pc => pc.id === penalty.player_character_id).character.name
        setCharacterName(character)

        const rule = ruleList.find(rule => rule.id === penalty.rule_id).name
        setRuleName(rule)
    }, [ruleList, penalty])

    function updateEditPenaltyForm(e) {
        const updatedForm = {
            ...editPenaltyForm,
            [e.target.name]: e.target.value
        }
        setEditPenaltyForm(updatedForm)
    }

    function cancelEdit() {
        setPenaltyEditorOn(false)
        setEditPenaltyForm({
            player_character_id: penalty.player_character_id,
            rule_id: penalty.rule_id,
            description: penalty.description
        })
    }

    function deletePenalty() {
        console.log("delete")
    }

    const penaltyDiv = <div>
        <p>Rule: {ruleName} Player: {playerName} ({characterName}) - {penalty.description} - {penalty.created_at}</p>
        <button onClick={() => setPenaltyEditorOn(true)}>EDIT</button>
    </div>

    const penaltyForm = <form onSubmit={(e) => {submitPenaltyForm(e, editPenaltyForm, penalty.id); setPenaltyEditorOn(false)}}>
        <select name="rule_id" value={editPenaltyForm.rule_id} onChange={updateEditPenaltyForm}>
            {ruleList.map(rule => {
                return <option key={rule.id} value={rule.id}>{rule.name}</option>
            })}
        </select>
        <select name="player_character_id" value={editPenaltyForm.player_character_id} onChange={updateEditPenaltyForm}>
            {players.map(pc => {
                return <option key={pc.id} value={pc.id}> {pc.player.name} ({pc.character.name})</option>
            })}
        </select>
        <input type="text" name="description" value={editPenaltyForm.description} onChange={updateEditPenaltyForm}></input>
        <button type="button" onClick={cancelEdit}>Cancel Edit</button>
        <button>Submit</button>
        <br></br>
        <button type="button" onClick={deletePenalty}>DELETE Penalty</button>
    </form>

  return (
    <>
    {penaltyEditorOn ? penaltyForm : penaltyDiv}
    </>
  )
            //     const rule = (ruleList.length !== 0 ? ruleList.find(rule => rule.id === penalty.rule_id).name : "loading")
            //     return (
            //         (penalty.id !== editPenaltyOn) ? <p key={penalty.id} id={penalty.id}>{penalty.created_at} - Penalty: {rule} - Player: {playerName} ({character}) - {penalty.description} <button onClick={() => editPenalty(penalty)}>EDIT</button></p> : 
            //         <div key={penalty.id}>
            //         <p id={penalty.id}>{penalty.created_at} - Penalty: {rule} - Player: {playerName} ({character}) - {penalty.description} <button onClick={() => setEditPenaltyOn(false)}>Cancel Edit</button></p>
            //         <form onSubmit={submitUpdatedPenaltyForm}>
            //             Update Description: <input type="text" id="description" onChange={updateDescription} value={editPenaltyForm.description}></input>
            //             <button>Confirm Update</button>
            //         </form>
            //         <button>Delete Penalty</button>
            //         </div>
                
            //     )
            // })
}

export default Penalty