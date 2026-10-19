import React from 'react'

export default function Footer() {
  return (
    <footer className="w-full py-10 md:py-56 flex flex-col items-center justify-center bg-[#f4f4f4] text-[#1e1e1e] relative px-4">
      <div className=" flex flex-col md:flex-row items-start justify-center gap-16 md:gab-32 text-sm font-light">
        <div className="flex flex-col gap-2 items-center">
          <span className='uppercase text-gray-500 text-xs tracking-widest'>Info</span>
          <ul>
            <li className='cursor-pointer hover:underline'>Pricing</li>
            <li className='cursor-pointer hover:underline'>About</li>
            <li className='cursor-pointer hover:underline'>Contents</li>
          </ul>
        </div>

        {/*Langueges section */}
        <div className="flex flex-col gap-2 items-start">
          <span className="uppercase text-gray-500 text-xs tracking-widest">Languages</span>
          <ul>
            <li className='cursor-pointer hover:underline'>English</li>
            <li className='cursor-pointer hover:underline'>Spanish</li>
            <li className='cursor-pointer hover:underline'>French</li>
          </ul>
        </div>
        {/*Technology section */}
        <div className="flex flex-col gap-2 items-start">
          <span className="uppercase text-gray-500 text-xs tracking-widest">Technology</span>
          <div className="text-[60px] font-bold leading-[-1] tracking-tight">
            <div className="opacity-10">VR</div>
            <div>XIV</div>
            <div>QR</div>
          </div>
          <p className='text-xs text-gray-500 mt-2'>Near-field communication</p>
        </div>
      </div>
      {/*Bottom Bar */}
      <div className="absolute bottom-6 w-full flex items-center justify-between px-6 text-xs text-gray-400">
        <span>© 2026. All rights reserved.</span>
        <span className='cursor-pointer hover:underline'>privacy</span>
      </div>
    </footer>
  )
}
