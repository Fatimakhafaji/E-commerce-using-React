import React, { useState } from 'react'


const Slider = ({allproducts}) => {
        const [startIndex, setStartIndex]= useState(0);

    const nextSlide =() =>{
        if (startIndex< allproducts.length -4){
                setStartIndex(startIndex +1);
            }
        };
        const prevSlide =() =>{
            if(startIndex>0){
                setStartIndex(startIndex -1);
    }
        
    };
  return (
    <div className='bg-[#f4f4f4] px-8 py-12'>
        <div className='flex gap-8'>
            {allproducts.slice(startIndex, startIndex +4).map((product)=>(
                <div key={product.id} className='flex flex-col w-1/4'>
                    <div className='relative bg-white p-4 h-[450px] border border-gray-200 group cursor-pointer'>
                        <img src={product.image} alt={product.name} 
                        className='w-full h-[100%] object-contain transition-transform duration-300 group-hover:scale-105'/>
                    </div>
                    <div className='absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#f4f4f4] w-8 h-8 flex items-center justify-center'>
                    +
                    </div>
                    <div className='flex justify-between mt-3'>
                        <p className='text-xs text-gray-500'>{product.category}</p>
                        <p className='text-sm font-semibold'>{product.title}</p>
                    </div>
                    
                    <span className='text-sm font-medium'>${product.price.toFixed(2)}</span>
                </div>
            ))}
        </div>
        <div className='flex justify-center gap-4 mt-6'>
            <button onClick={prevSlide}
            disabled={startIndex === 0}
            className='w-10 h-10 flex items-center justify-center border border-gray-400 hover:bg-gray-200 disabled:opacity-50'
            >
            &#8249;
            </button>
            <button onClick={nextSlide}
            disabled={startIndex>= allproducts.length -4}
            className='w-10 h-10 flex items-center justify-center border border-gray-400 hover:bg-gray-200 disabled:opacity-50'
            >
               &#8250; 
            </button>
        </div>
    </div>
  )
}

export default Slider;
