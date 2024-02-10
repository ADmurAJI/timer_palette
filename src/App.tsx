import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Timer from './components/Timer/Timer';
import Palette from './components/Palette/Palette';

const App: React.FC = () => {
  return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/timer">Таймер</Link>
              </li>
              <li>
                <Link to="/palette">Палитра</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/timer" element={<Timer />} />
            <Route path="/palette" element={<Palette />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;
