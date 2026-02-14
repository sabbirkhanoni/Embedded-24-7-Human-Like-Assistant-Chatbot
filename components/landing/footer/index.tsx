import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className="bg-[#0f0f0f] border-t border-gray-700 py-4">
      <div className="max-w-4xl mx-auto text-center flex items-center justify-between">
        <Link href={"/"} className='text-2xl font-bold text-zinc-50 flex items-center'>
          <div className='w-5 h-5 bg-white rounded-full flex items-center justify-center'>
            <div className='w-3 h-3 bg-[#050508] rounded-full'></div>
          </div>
            
          <span className='text-sm font-medium ml-2'>PAI ChatBot</span>
        </Link>
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} PAI ChatBot. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
