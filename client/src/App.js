import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Route1 from './components/Route1';
import Route2 from './components/Route2';
import ResponsiveAppBar from './components/ResponsiveAppBar';

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/route1' element={<Route1 />}/>
        <Route path='/route2' element={<Route2 />}/>
      </Routes>
    </div>
  );
}

export default App;
