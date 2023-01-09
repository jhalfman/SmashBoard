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

  useEffect(() => {
    fetch(`/rules`)
    .then(resp => resp.json())
    .then(rules => setRuleList(rules))
  }, [])

  return (
    <div className="App">
      <ResponsiveAppBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/players' element={<Players />}/>
        <Route path='/nights' element={<NightsTable />}/>
        <Route path='/nights/new' element={<CreateNight />}/>
        <Route path='/nights/:id' element={<Night />}/>
        <Route path='/games/new' element={<NewGame />}/>
        <Route path='/games/:id' element={<Game ruleList={ruleList}/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
