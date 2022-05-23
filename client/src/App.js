import './App.css';
import AppProvider from './components/AppProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBar from './components/SideBar';
import Home from './pages/Home';

function App() {
  return (
    <div className='app'>
      <AppProvider>
        <Router>
          <SideBar />
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </Router>
      </AppProvider>
    </div>
  );
}

export default App;
