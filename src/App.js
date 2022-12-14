import './App.css';
import Footer from './components/Footer';
import NavigationBar from './components/NavigationBar';
import Game from './components/Game';

import { HashRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import Error from './pages/Error';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<StartPage />} />
        <Route path='/game' element={<Game />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
