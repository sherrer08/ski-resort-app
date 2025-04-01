import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Resort from './pages/Resort';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route
              path='/'
              element = {<Home />}
            />
            <Route
              path='api/resorts/:id'
              element = {<Resort />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App
