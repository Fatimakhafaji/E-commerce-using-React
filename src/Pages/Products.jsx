import React, { useEffect ,useState} from 'react'
import axios from "axios"
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

  useEffect(()=>{
    let data= [...products]
    //category
    if (searchCategory){
      data = data.filter((item)=> item.category === searchCategory)
    }

    //price
    data = data.filter((item)=> item.price >= priceRange[0] && item.price <= priceRange[1])

    //rating
    data = data.filter((item)=> item.rating.rate >= minRating )
    setFilterProducts(data);
  },[products , priceRange ,minRating , searchCategory])
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 p-4 border-r">
        <h2 className='font-bold text-lg md-4'>Filters</h2>
        <div className='mb-4'>
          <h3 className='font-semibold md-2'>Category</h3>
          <select className='w-full border rounded p-2'
          value={searchCategory}
          onChange={(e) => setsearchCtegory(e.target.value)}
          >
            <option value="">All</option>
            {category.map((item)=>{
              return <option value={item}>{item}</option>
            })}
          </select>
        </div>
        {/*price Range */}
        <div className='mb-4'>
          <h3 className='font-semibold mb-2'>Price Range</h3>
          <input
          type="number"
          className='w-full border p-1 mb-2'
          placeholder='min'
          value={priceRange[0]}
          onChange={(e) => setPriceRange([Number(e.target.value),priceRange[1]])}
          />
          <input
          type="number"
          className='w-full border p-1'
          placeholder='max'
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0],Number(e.target.value)])}
          />
        </div>

        {/**Rating */}
        <div>
          <h3 className='font-semibold mb-2'>Minimum Ratung</h3>
          <input 
          type="number" 
          min='0'
          max='5'
          step='0.5'
          className='w-full border p-1'
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          />
        </div>
      </aside>
      {/**Main Products */}
      <main className='flex-1 p-6'>
        <h1 className='text-2xl font-bold mb-4'>Products</h1>
        {loading ?(
          <p>Loading ..</p>
        ):(
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {filterProducts.map((product)=>(
              <div key={product.id}
              className='bg-white p-4 border rounded-lg shadow-sm hover:shadow-md transition'>
                <img src={product.image} alt={product.title}
                className='h-48 w-full object-contain mb-4'/>
                <h3 className='font-semibold text-gray-800 truncate'>
                  {product.title}
                </h3>
                <p className='text-gray-500 text-sm'>{product.category}</p>
                <p className='text-lg font-bold mt-2'>${product.price}</p>
                <p className='text-yallow-500 text-sm'> *{product.rating.rate} /5</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
