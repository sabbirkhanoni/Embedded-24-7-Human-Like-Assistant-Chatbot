import React from 'react'

const Footer = () => {
  return (
    <div className="bg-[#0f0f0f] border-t border-gray-700 py-4">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} PAI ChatBot. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
