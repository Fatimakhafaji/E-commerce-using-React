import React, { useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../baseUrl'

export default function AddProduct() {
    const [formData , setFormData] = useState({
        title : "" ,
        price : "" ,
        description : "" ,
        category : "" ,
        image : ""
    })
    const [loading , setLoading] = useState(false)
    const [err , seterror] = useState('')

    const HandleChange =(e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }
    const hundleSubmit = async(e)=>{
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post(`${baseUrl}/products`,formData)
            console.log(res.data)
        } catch (error) {
            seterror(error.massege)
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
  return (
    <div className='min-h-screen flex items-start justify-center pt-10 bg-gray-50 p-4'>
    <form className='w-full max-w-md text-center p-6 border border-red-500 rounded-lg bg-white shadow-md my-20' onSubmit={hundleSubmit}>
        <h2 className='font-bold text-4xl'>add product</h2>
        <input className='w-full rounded-3xl border border-gray-500 p-2 my-1.5'
        type="text"
        name='title' 
        placeholder='title'
        value={formData.title}
        onChange={HandleChange}
        required
        />
        <input className='w-full rounded-3xl border border-gray-500 p-2 my-1.5'
        type="number"
        name='price' 
        placeholder='price'
        value={formData.price}
        onChange={HandleChange}
        required
        />
         <input className='w-full rounded-3xl border border-gray-500 p-2 my-1.5'
        type="text"
        name='description' 
        placeholder='description'
        value={formData.description}
        onChange={HandleChange}
        />
        <input className='w-full rounded-3xl border border-gray-500 p-2 my-1.5'
        type="text"
        name='image' 
        placeholder='image'
        value={formData.image}
        onChange={HandleChange}
        />
        <select
        className='w-full rounded-3xl border border-gray-500 p-2 my-1.5'
        name="category"
        placeholder='category'
        value={formData}
        onChange={HandleChange}
        >
            <option value="" hidden>category</option>
            <option value="jewelry">jewelry</option>
            <option value="mens clothing">mens clothing</option>
            <option value="women clothing">womens clothing</option>
            <option value="electronics">electronics</option>
        </select>
        

        <button type='submit'
        className='w-full bg-red-700 text-white text-center curcor-pointer py-1'
        >
            {loading? 'loadung':'Send'}
        </button>
        {err &&(<p className='text-red-700 text-center text-sm'>{err}</p>)}
        
    </form>
    </div>
    
  )
}
