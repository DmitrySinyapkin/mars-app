import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import About from './forms/About/About';

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
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
