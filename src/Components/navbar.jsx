import React , {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import{FaHeart , FaUser , FaShoppingBag,FaBars} from 'react-icons/fa'
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn,setLoggedIn] = useState(false);
  
  useEffect(()=>{
    if(localStorage.getItem('token')){
      setLoggedIn(true)
    }else{
      setLoggedIn(false)
    }
  },[])

  const logout =()=>{
    localStorage.removeItem('token');
    window.location='/login';
  }
  return (
    <nav className="w-full flex justify-between items-center px-4 md:px-10 py-4 bg-white shadow-sm relative">
      <div className="flex item-center space-x-6">
        <button onClick={() => setMenuOpen(!menuOpen)}
          className='md:hidden text-2xl'
          >
          <FaBars />
        </button>
        <ul className="hidden md:flex space-x-6 item-center font-medium">
          <Link to={"/"} className="cursor-pointer ">Home</Link>
          <Link to={"/about"} className="cursor-pointer ">About</Link>
          <Link to={"/products" }className="cursor-pointer ">Products</Link>
          {loggedIn && (
            <Link to={'/addproduct'} className='cursor-pointer'>Add Product</Link>
          )}
        </ul>
      </div>
      {/*center logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
       <div className="w-5 h-5 rotate-45 bg-black relative">
        <div className="absolute inset-0 bg-white -z-10 rotate-45 scale-125"/>
       </div>
      </div>
      {/*right icons */}
      {
        loggedIn ? (
          <div className="flex item-center space-x-4 md:space-x-6">
        <button className='bg-black text-white p-2 rounded-full'>
          <FaHeart /> 
        </button>
        <div className="flex items-center space-x-2 bg-black text-white px-3 py-2 rounded-full">
          <span className="text-sm">Cart</span>
          <div className="bg-white text-black p-1 rounded-full">
            <FaShoppingBag />
          </div>
        </div>
        <button className="bg-black text-white p-2 rounded-full">
          <FaUser />
        </button>
        <button className="bg-red-600 text-white p-2 rounded-full cursor-pointer" onClick={logout}>
          Log out
        </button>
      </div>
        ):(
          <Link to={"/login"}><button className="bg-black text-white p-2 rounded-sm cursor-pointer">Login</button></Link>
        )
      }
      {/* mobile menu */}
      {menuOpen && (
        <ul className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col space-y-2 py-4 px-6 md:hidden z-10">
          <Link to={"/"} className="cursor-pointer ">Home</Link>
          <Link to={"/about"} className="cursor-pointer ">About</Link>
          <Link to={"/products" }className="cursor-pointer ">Products</Link>
           {loggedIn && (
            <Link to={'/addproduct'} className='cursor-pointer'>Add Product</Link>
          )}
        </ul>  
      )}        
    </nav>
  );
}
