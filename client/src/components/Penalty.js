import React, { useEffect } from 'react';
import {useState} from 'react';

const Penalty = ({penalty, players, ruleList, submitPenaltyForm, deletePenalty}) => {
    const [playerName, setPlayerName] = useState("")
    const [characterName, setCharacterName] = useState("")
    const [ruleName, setRuleName] = useState("")
    const [editPenaltyForm, setEditPenaltyForm] = useState({
        player_character_id: penalty.player_character_id,
        rule_id: penalty.rule_id,
        description: penalty.description
    })
    const [penaltyEditorOn, setPenaltyEditorOn] = useState(false)

    useEffect(() => {
        const player = players.find(pc => pc.id === penalty.player_character_id).player.name
        setPlayerName(player)

        const character = players.find(pc => pc.id === penalty.player_character_id).character.name
        setCharacterName(character)

        const rule = ruleList.find(rule => rule.id === penalty.rule_id).name
        setRuleName(rule)
    }, [ruleList, penalty, players])

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

    const penaltyDiv = <div>
        <p>Rule: {ruleName} Player: {playerName} ({characterName}) - {penalty.description} - {penalty.created_at}</p>
        <button onClick={() => setPenaltyEditorOn(true)}>EDIT</button>
        <hr></hr>
    </div>

    const penaltyForm = <form onSubmit={(e) => {submitPenaltyForm(e, editPenaltyForm, penalty.id, penalty.player_character_id, penalty.rule_id); setPenaltyEditorOn(false)}}>
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
        <button type="button" onClick={() => deletePenalty(penalty.id, penalty.player_character_id, penalty.rule_id)}>DELETE Penalty</button>
        <hr></hr>
    </form>

  return (
    <>
    {penaltyEditorOn ? penaltyForm : penaltyDiv}
    </>
  )
}

export default Penalty