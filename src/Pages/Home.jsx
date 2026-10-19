import React, { useEffect, useState } from 'react';
import axios from "axios";
import { baseUrl } from '../../baseUrl'; 
import {MoonLoader} from 'react-spinners'
import NewCollection from '../Components/newCollection';
import Slider from './../Components/slider';

const Home =() =>{
  const [products ,setProducts] = useState([]);
  const [loading , setLoading] = useState(false);
  const [error ,setError] = useState(null);
  useEffect(()=>{
    const getAllProducts = async ()=>{
      setLoading(true)
      try{
        const res =await axios.get(`${baseUrl}/products`)
        .then((res) => setProducts(res.data))
      }catch (err){
        console.log(err);
        setError('fialed to fetch data')
      }finally{
        setLoading(false)
      }
    }
    getAllProducts();
  },[])
  if(loading){
    return 
    <div className='my-12 mx-20 text-center'>
      <MoonLoader color="#d75636" size={60} loading={true}/>
    </div>
  }
  return(
    <div className='py-9 px-10 bg-[#f2f2f2] text-black min-h-screen'>
      <NewCollection allproducts={products}/>
      <h2 className='text-center text-3xl mt-10 yext-black'>All Products</h2>
      <Slider allproducts={products}/>
    </div>
  );
};

export default Home;
