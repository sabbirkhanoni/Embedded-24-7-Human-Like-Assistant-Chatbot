import Image from 'next/image'
import chatProfile from '../../../public/chat_profile.jpg'
import aiProfile from '../../../public/AI_profile.jpg'
import React from 'react'
import { Send } from 'lucide-react'

const Hero = () => {
  return (
    <section id="hero" className="relative bg-gradient-to-r from-[#11b452] via-[#3c23e4] to-[#11b452] overflow-hidden pb-20 pt-30 md:pt-40 md:pb-30 px-6">
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

            <div>
                <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">Try with Free Trial
                    <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                </button>
                <button className="bg-white cursor-pointer hover:bg-gray-800 hover:text-white text-gray-800 font-bold py-2 px-4 rounded-full ml-4 transition duration-300 ease-in-out">Demo
                    <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                </button>
            </div>
        </div>


        {/* Chat Preview */}
        <div className="mt-20 max-w-3xl mx-auto relative z-20">
            <div className="bg-[#0f0f0f] px-4 space-y-4 p-2 border border-gray-700 w-full rounded-lg shadow-lg flex flex-col items-start animate-float animation-delay-4000 h-145">
                <div className="flex bg-black w-full p-3 rounded-t-md items-center mb-2">
                    <div className="w-5 h-5 rounded-full bg-blue-600 mr-2"></div>
                    <span className="text-sm font-medium text-white">PAI ChatBot</span>
                </div>

                {/* AI Response*/}
                <div className="flex flex-col items-center w-full">
                    <div className='flex items-center w-full'>
                        <div className='w-8 h-8 rounded-full bg-gray-700 mr-4 flex-shrink-0'>
                            <Image
                                width={32}
                                height={32}
                                src={aiProfile}
                                alt="Chat Preview"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>

                        <div className='bg-blue-500 rounded-lg px-5 py-3'>
                            <p className="text-sm font-medium text-gray-300">Hello! I'm PAI ChatBot, your AI assistant. How can I help you today?</p>
                        </div>
                    </div>

                    <div className='flex mt-2 space-x-2 w-full justify-center gap-2'>
                        <p className='border border-gray-300 rounded-full px-2 py-1 text-xs opacity-80 w-fit bg-gray-950 text-white'>Pricing plan</p>
                        <p className='border border-gray-300 rounded-full px-2 py-1 text-xs opacity-80 w-fit bg-gray-950 text-white'>FAQ</p>
                        <p className='border border-gray-300 rounded-full px-2 py-1 text-xs opacity-80 w-fit bg-gray-950 text-white'>Contact Support</p>
                    </div>
                </div>

                {/* User Message*/}
                <div className='flex items-center gap-4 justify-end w-full'>
                    <div className='bg-white rounded-lg px-5 py-3'>
                        <p className="text-sm text-black font-medium">I want to know more about the pricing plans.</p>
                    </div>

                    <div className='w-8 h-8 rounded-full bg-gray-700 mr-4 flex-shrink-0'>
                        <Image
                            width={32}
                            height={32}
                            src={chatProfile}
                            alt="Chat Preview"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                </div>

                {/* AI Response*/}
                <div className='flex items-center w-full'>
                    <div className='w-8 h-8 rounded-full bg-gray-700 mr-4 flex-shrink-0'>
                        <Image
                            width={32}
                            height={32}
                            src={aiProfile}
                            alt="Chat Preview"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>

                    <div className='bg-blue-500 rounded-lg px-5 py-3'>
                        <p className="text-sm font-medium text-gray-300">The pricing plans are as follows:</p>
                        <ul className="list-disc list-inside text-sm text-gray-300 mt-2">
                            <li><strong>Basic:</strong> $9.99/month - Access to core features and limited usage.</li>
                            <li><strong>Pro:</strong> $29.99/month - Unlimited usage, priority support, and advanced analytics.</li>
                            <li><strong>Enterprise:</strong> Custom pricing - Tailored solutions for large organizations with dedicated support.</li>
                        </ul>
                    </div>
                </div>

                {/* User Message*/}
                <div className='flex items-center gap-4 justify-end w-full'>
                    <div className='bg-white rounded-lg px-5 py-3'>
                        <p className="text-sm text-black font-medium">Oh, I see! Thank you for the information.</p>
                    </div>

                    <div className='w-8 h-8 rounded-full bg-gray-700 mr-4 flex-shrink-0'>
                        <Image
                            width={32}
                            height={32}
                            src={chatProfile}
                            alt="Chat Preview"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                </div>

                {/* AI Response*/}
                <div className='flex items-center w-full'>
                    <div className='w-8 h-8 rounded-full bg-gray-700 mr-4 flex-shrink-0'>
                        <Image
                            width={32}
                            height={32}
                            src={aiProfile}
                            alt="Chat Preview"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>

                    <div className='bg-blue-500 rounded-lg px-5 py-3'>
                        <p className="text-sm font-medium text-gray-300">Pleasure, Please let me know if you have any other questions.</p>
                    </div>
                </div>


                <div className='border mt-5 w-full border-gray-700'></div>
                <div className='flex  items-center w-full'>
                    <div className='w-8 h-8 rounded-full bg-gray-700 mr-4 flex-shrink-0'>
                        <Image
                            width={32}
                            height={32}
                            src={chatProfile}
                            alt="Chat Preview"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>

                    <div className='bg-gray-800 flex w-full rounded-lg px-5 py-3'>
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="bg-transparent border-none outline-none text-sm text-gray-300 placeholder-gray-500 w-full"
                        />

                        <div className='flex justify-end items-center'>
                            <button className=" text-white font-bold mt-2 float-right text-sm animate-pulse">
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Hero
