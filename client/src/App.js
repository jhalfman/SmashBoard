import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SessionsTable from './components/SessionsTable';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Session from './components/Session';
import Route2 from './components/Route2';

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/sessions' element={<SessionsTable />}/>
        <Route path='/route2' element={<Route2 />}/>
        <Route path='/sessions/:id' element={<Session />}/>
      </Routes>
      
    </div>
  );
}

export default App;
