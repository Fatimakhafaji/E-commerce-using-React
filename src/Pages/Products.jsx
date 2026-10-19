import React, { useEffect ,useState} from 'react'
import {axios} from 'axios'
import {baseUrl} from '../../baseUrl'
export default function Products() {

  const [products, setProducts] = useState([]);
  const [loading , setLoading] = useState(false);
  const [filterProducts,setFilterProducts]=useState([]);
  const [category , setCategory] = useState([]);
  const [searchCategory , setsearchCtegory] = useState('');
  const [priceRange , setPriceRange] = useState([0,100]);
  const [minRating , setMinRating] = useState(0);
  useEffect(()=>{
    const fetchData= async()=>{
      try{
        setLoading(true);
        const response = await axios.get(`${baseUrl}/products`);
        setProducts(response.data);
        setFilterProducts(response.data);


        let categories = []
         response.data.map((product)=>{
          if(categories.indexOf(product.category)===-1){
            categories.push(product.category)
          }
        });
        setCategory(categories)
      }catch(err){
        console.log(err);
    }finally{
        setLoading(false);
      }
    }
    fetchData();
  },[])
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 p-4 border-r">
        <h2 className='font-bold text-lg md-4'>Filters</h2>
        <div className='mb-4'>
          <h3 className='font-semibold md-2'>Category</h3>
          <select className='w-full border rounded p-2'>
            <option value="">All</option>
          </select>
        </div>

      </aside>
    </div>
  )
}
