import './App.css';
import Footer from './components/Footer';
import NavigationBar from './components/NavigationBar';
import Game from './components/Game';

function App() {
  return (
    <section>
      <div className="App">
        <header className="nav-bar">
          <NavigationBar></NavigationBar>
        </header>
      </div>

      <div>
        <Game></Game>
      </div>

      <div className="footer">
        <Footer></Footer>
      </div>
    </section>
  );
}

export default App;
