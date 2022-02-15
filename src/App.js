import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' 
import Login from './components/Login';
import Registration from './components/Registration';
import Navbar from './components/shared/Navbar';
import PageNotFound from './components/shared/PageNotFound';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
          <Route path='/api/login' element={<Login/>} />
          <Route path='/api/registration' element={<Registration/>} />
          <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;
