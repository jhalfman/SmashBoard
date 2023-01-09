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

function App() {
  const [ruleList, setRuleList] = useState([])
  const [players, setPlayers] = useState([])
  const [characters, setCharacters] = useState([])
  const [currentNight, setCurrentNight] = useState([])

  useEffect(() => {
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
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
        setPlayers([...players, data])
    })
}

  return (
    <div className="App">
      <ResponsiveAppBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/players' element={<Players players={players} createNewPlayer={createNewPlayer}/>}/>
        <Route path='/nights' element={<NightsTable />}/>
        <Route path='/nights/new' element={<CreateNight />}/>
        <Route path='/nights/:id' element={<Night setCurrentNight={setCurrentNight}/>}/>
        <Route path='/games/new' element={<NewGame players={players} characters={characters} currentNight={currentNight}/>}/>
        <Route path='/games/:id' element={<Game ruleList={ruleList}/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
