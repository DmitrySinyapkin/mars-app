import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import About from './forms/About/About';
import Gallery from './forms/Gallery/Gallery';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <header>
          <Header />
        </header>
        <main>
          <Routes>
            <Route path={'/'} element={<About />} />
            <Route path={'/gallery'} element={<Gallery />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
