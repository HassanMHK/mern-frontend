import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from "./hooks/useAuthContext";
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import Navbar from './components/navbar'
import Footer from './components/footer';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <div className='page'>
          <Routes>
            <Route path='/' element={user ? <Home /> : <Navigate to={'/login'} />} />
            <Route path='/login' element={!user ? <Login /> : <Navigate to={'/'} />} />
            <Route path='/register' element={!user ? <Register /> : <Navigate to={'/'} />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
