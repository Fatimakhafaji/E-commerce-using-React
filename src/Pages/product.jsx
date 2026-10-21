import { useEffect, useState } from 'react'
import {useParams , useNavigate} from 'react-router-dom'
import axios from 'axios'
import { baseUrl } from '../../baseUrl'


const ProductDetail =()=>{
const {id} = useParams()
const navigate = useNavigate();
const [loading , setLoading] = useState(false);
const [Product, setProduct] = useState(null);
const [showEdit , setShowEdit] = useState(false)
const [data , setData]= useState({
    title :"" ,
    description :""
})
useEffect(()=>{
    const fetchProduct=async( )=>{
        try {
            setLoading(true)
            const res =await axios.get(`${baseUrl}/products/${id}`)
            setProduct(res.data)
            setData({ title: res.data.title, description: res.data.description });
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    fetchProduct()
},[id])

const handleDelete =async ()=>{
    if(window.confirm("delete product")){
        try {
            setLoading(true)
            await axios.delete(`${baseUrl}/products/${id}`)
            alert('Done')
            navigate('/products')
            //window.location='/'
        } catch (error) {
            alert("error in delete product")
        }finally{
            setLoading(false)
        }
    }
}

const handleChange = (e)=>{
    setData((prev) => ({...prev , [e.target.name] :e.target.value}))
}

const handleSubmit =async (e)=>{
    e.preventDefault()
    try {
        setLoading(true)
        const res = await axios.put(`${baseUrl}/products/${id}` , data)
        setProduct(res.data)
        setShowEdit(false)
        alert('Product updated successfully')
    } catch (error) {
        alert('error in edit product')
    }finally{
        setLoading(false)
    }

}
if(loading){
    return(
        <h2 className='mx-auto w-fit my-8 text-2xl text-red font-bold'>Loading...</h2>
    )
}

if(!Product){
    return(
        <h2 className='mx-auto w-fit my-8 text-2xl text-red font-bold'>not found product...</h2>
    )
}
    return(
       // <h2>product</h2>
        <div className='bg-gray-100 min-h-screen py-10 px-4 flex justify-center items-start'>
      {/* main card*/}
      <div className='bg-white shadow-lg rounded-xl max-w-2xl w-full p-6 relative'>
        
        {/* title*/}
        <h1 className='text-2xl font-bold mb-4 text-gray-800'>{Product.title}</h1>
        
        {/* img*/}
        <div className='flex justify-center mb-6 bg-gray-50 rounded-lg p-4'>
          <img 
            src={Product.image} 
            alt={Product.title}
            className='w-64 h-64 object-contain'
          />
        </div>
        
        {/*pric and add button */}
        <div className='flex items-center justify-between mb-4'>
          <span className='text-2xl font-bold text-gray-800'>${Product.price}</span>
          <button className='bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition'>
            Add To Cart
          </button>
        </div>

        {/* rating*/}
        <div className='flex items-center mb-6'>
          {Array.from({ length: 5 }, (_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              fill={i < Math.floor(Product?.rating?.rate || 0) ? "orange" : "lightgray"}
              viewBox='0 0 24 24'
              stroke='none'
              className='w-5 h-5'
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
          <span className='ml-2 text-gray-600 text-sm'>({Product?.rating?.count || 0})</span>
        </div>

        {/*description*/}
        <p className='text-gray-700 mb-6 leading-relaxed'>{Product.description}</p>
        
       
        <div className='flex justify-between items-start border-t pt-4'>
          <div>
            <h3 className='font-semibold mb-2 text-gray-800'>Details</h3>
            <p className='text-sm text-gray-600 mb-1'>Category: {Product.category}</p>
            <p className='text-sm text-gray-600'>Brand: Vera</p>
          </div>
          <img src={Product.image} alt="Thumbnail" className='w-16 h-16 object-contain border rounded p-1'/>    
        </div>

        {/* update delete button*/}
        <div className='flex gap-4 mt-8 pt-6 border-t border-gray-200'>
          <button 
            onClick={() => setShowEdit(true)} 
            className='flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200'
          >
            Update
          </button>
          <button 
            onClick={handleDelete} 
            className='flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200'
          >
            Delete
          </button>
        </div>
      </div>

      {/* edit card */}
      {showEdit && (
        <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50 backdrop-blur-sm p-4'>
          <div className='bg-white rounded-xl shadow-2xl p-6 w-full max-w-md'>
            <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>Edit Product</h2>
            
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
                <input 
                  type="text" 
                  name='title' 
                  value={data.title} 
                  onChange={handleChange} 
                  required 
                  placeholder='Enter title'
                  className='border border-gray-300 w-full p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
                <textarea 
                  name='description' 
                  value={data.description} 
                  onChange={handleChange} 
                  required 
                  placeholder='Enter description'
                  className='border border-gray-300 w-full p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-black min-h-[100px] resize-none'
                />
              </div>

              <div className='flex justify-end gap-3 mt-4'>
                <button 
                  type="button"
                  className='px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition' 
                  onClick={() => setShowEdit(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className='px-5 py-2.5 bg-black hover:bg-gray-800 text-white font-semibold rounded-lg transition'
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;