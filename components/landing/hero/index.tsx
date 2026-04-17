import Image from 'next/image'
import chatProfile from '../../../public/chat_profile.jpg'
import aiProfile from '../../../public/AI_profile.jpg'
import React from 'react'
import { Send } from 'lucide-react'

const Hero = () => {
  return (
    <section id="hero" className="h-screen bg-gradient-to-r from-[#11b452] via-[#3c23e4] to-[#11b452] overflow-hidden pb-20 pt-30 md:pt-40 md:pb-30 px-6">
        <div className="max-w-4xl mx-auto relative z-20 text-center">
            <div className='flex flex-col items-center px-3 py-1 mb-6 animate-float animation-delay-2000'>
                <span style={{ fontFamily: 'Acorn' }} className="text-5xl md:text-6xl font-bold  text-white mb-6 leading-tight">
                Revolutionize Your Conversations with PAI ChatBot
                </span>
                <h1 style={{ fontFamily: 'Acorn' }} className='text-4xl md:text-5xl font-bold text-gray-300 mb-6'>Powered by AI</h1>
                <span className="text-sm font-medium text-gray-300">
                    Experience the future of communication with our advanced AI technology.
                </span>
                <span className="text-xs font-medium text-gray-100 border border-gray-100 rounded-full px-3 py-1 mt-4 animate-pulse">
                    Version 1.0 - Launching Soon!
                </span>
            </div>
        </div>
        
    </section>
  )
}

export default Hero
