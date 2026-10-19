import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Products from './Pages/Products'
import Login from './Pages/Login'
import Navbar from './Components/navbar'
import Footer from './Components/footer'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/products' element={<Products />} />
       <Route path='/login' element={<Login />} /> 
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
