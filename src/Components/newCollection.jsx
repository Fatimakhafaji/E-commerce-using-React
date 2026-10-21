import React, { useEffect } from "react"
import {useState} from 'react'


export default function NewCollection({allproducts}) {
    const [startIndex, setStartIndex] = useState(0);
    const [showproducts, setShowProducts] = useState([]);
    useEffect(()=>{
        setShowProducts(allproducts.sort(()=>Math.random()- Math.random()).slice(0,4))
    },[allproducts])

    const nextSlide = () => {
        setStartIndex((prev)=>
         prev +2 < showproducts.length ? prev +2 : 0
    )};

    const prevSlide = () => {
        setStartIndex((prev)=>
         prev -2 >= 0 ? prev -2 : Math.max(showproducts.length -2, 0)
    )};

    const visibleImages = showproducts.slice(startIndex, startIndex + 2);
    return(
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
      {/* العمود الأول: النص والأزرار */}
      <div className="flex flex-col gap-4">
        <h1 className="text-[32px] font-black leading-tight">
          New<br />
          <span className="font-black">Collection</span>
        </h1>
        <p className="text-sm font-light leading-5 tracking-wider">
          summer <br /> 2026
        </p>
        <button className="mt-6 flex items-center gap-3 border border-gray-500 bg-[#e5e5e5] px-4 py-2 text-sm transition hover:font-bold">
          Go To shop <span className="text-xl">→</span>
        </button>
        <div className="flex gap-3 mt-6">
          <button
            onClick={prevSlide}
            className="w-8 h-8 border border-gray-500 text-lg flex items-center justify-center transition hover:bg-black hover:text-white"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="w-8 h-8 border border-gray-500 text-lg flex items-center justify-center transition hover:bg-black hover:text-white"
          >
            →
          </button>
        </div>
      </div>

      {/* العمودان الثاني والثالث: الصور جنباً إلى جنب */}
      {visibleImages.map((product) => (
        <div
          key={product.id}
          className="group relative w-full aspect-square cursor-pointer overflow-hidden"
        >
          <img
            src={product.image}
            alt={product.title}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] object-cover duration-300 group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}
