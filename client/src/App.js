import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NightsTable from './components/NightsTable';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Night from './components/Night';
import Game from './components/Game';
import CreateNight from './components/CreateNight';
import {useEffect, useState} from 'react';
import NewGame from './components/NewGame';
import Players from './components/Players';
import Login from './components/Login';
import CreateUser from './components/CreateUser';

function App() {
  const [ruleList, setRuleList] = useState([])
  const [players, setPlayers] = useState([])
  const [characters, setCharacters] = useState([])
  const [currentNight, setCurrentNight] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [nightName, setNightName] = useState("")
  const [errors, setErrors] = useState(null)
  const [admin, setAdmin] = useState(false)
  
  useEffect(() => {
    fetch('/users/:id')
    .then(resp => {
      if (resp.ok) {
        resp.json().then(user => {setCurrentUser(user); setAdmin(user.admin)})
      }
    })

    fetch(`/rules`)
    .then(resp => resp.json())
    .then(rules => setRuleList(rules))

    fetch(`/players`)
    .then(resp => resp.json())
    .then(playerList => setPlayers(playerList))

    fetch(`/characters`)
    .then(resp => resp.json())
    .then(characterList => setCharacters(characterList))
  }, [])

  function createNewPlayer(e, newPlayerForm) {
    e.preventDefault();
    fetch(`/players`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPlayerForm)
    })
    .then(resp => {
      if (resp.ok) {
        resp.json().then(data => {
          setPlayers([...players, data])
          setErrors(null)
        })
      }
      else
        resp.json().then(data => {
          const errors = Object.entries(data.errors).map(error => `${error[0]} ${error[1]}`)
          setErrors(errors)
        })
    })
}

  return (
    <div className="App">
      <ResponsiveAppBar currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      <Routes>
        <Route path='/' element={<Home currentUser={currentUser}/>}/>
        <Route path='/login' element={<Login setCurrentUser={setCurrentUser}/>}/>
        <Route path='/user/new' element={<CreateUser setCurrentUser={setCurrentUser}/>}/>
        <Route path='/players' element={<Players players={players} createNewPlayer={createNewPlayer} errors={errors} setPlayers={setPlayers} admin={admin}/>}/>
        <Route path='/nights' element={<NightsTable setNightName={setNightName}/>}/>
        <Route path='/nights/new' element={<CreateNight setNightName={setNightName}/>}/>
        <Route path='/nights/:id' element={<Night setCurrentNight={setCurrentNight} ruleList={ruleList} nightName={nightName} setNightName={setNightName}/>}/>
        <Route path='/games/new' element={<NewGame players={players} characters={characters} currentNight={currentNight}/>}/>
        <Route path='/games/:id' element={<Game ruleList={ruleList} currentUser={currentUser}/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
