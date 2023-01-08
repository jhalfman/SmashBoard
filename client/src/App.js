import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NightsTable from './components/NightsTable';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Night from './components/Night';
import Game from './components/Game';
import Route2 from './components/Route2';

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/nights' element={<NightsTable />}/>
        <Route path='/nights/:id' element={<Night />}/>
        <Route path='/games/:id' element={<Game />}/>
        <Route path='/route2' element={<Route2 />}/>
      </Routes>
      
    </div>
  );
}

export default App;
