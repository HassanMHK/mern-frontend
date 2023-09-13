import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home';
import Navbar from './components/navbar'
import Footer from './components/footer';
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <div className='page'>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
