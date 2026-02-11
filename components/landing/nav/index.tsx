import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
   <nav
   className="fixed top-0 inset-x-0 z-50 transition-all duration-300 backdrop-blur-sm border-b bg-[#050509]/80 px-6 py-0.5 mx-5 border border-gray-800 rounded-full backdrop:backdrop-blur-5xl mt-5">
      <div className='max-w-6xl mx-auto flex items-center justify-between px-5 h-15'>
        <Link href={"/"} className='text-2xl font-bold text-zinc-50 flex items-center'>
          <div className='w-5 h-5 bg-white rounded-full flex items-center justify-center'>
            <div className='w-3 h-3 bg-[#050508] rounded-full'></div>
          </div>
            
          <span className='text-sm font-medium ml-2'>PAI ChatBot</span>
        </Link>

        <div className="hidden gap-6 md:flex text-sm font-medium text-gray-300">
          <Link href={"#hero"} className="hover:text-gray-100 transition-colors duration-200">Home</Link>
          <Link href={"#docs"} className="hover:text-gray-100 transition-colors duration-200">Docs</Link>
          <Link href={"#pricing"} className="hover:text-gray-100 transition-colors duration-200">Pricing</Link>
          <Link href={"#contact"} className="hover:text-gray-100 transition-colors duration-200">Contact</Link>
        </div>

        <div>
          <Link href={"/login"} className="px-4 py-2 text-white transition-colors duration-200">Login</Link>
          <Link href={"/signup"} className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-green-700 transition-colors duration-200">Get Started</Link>
        </div>
      </div>
   </nav>
  )
}

export default Navbar
