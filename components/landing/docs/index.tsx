"use client"
import { Copy } from 'lucide-react'
import Script from 'next/script'
import React from 'react'

const Docs = () => {

    const [copy , setCopy] = React.useState(false);

    const handleCopyClick = () => {
        setCopy(true);
        setTimeout(() => {
            setCopy(false);
        }, 2000);
    }
    return (
        <section id="docs" className='grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto px-6 py-20'>
            <div className='space-y-6'>
                <h2 className='text-2xl font-bold'>Documentation</h2>
                <p className='text-gray-600'>Welcome to the PAI ChatBot documentation. Here you will find all the information you need to get started.</p>
            </div>

            <div className='space-y-4'>
                <h3 className='text-xl font-semibold'>Getting Started</h3>
                <p className='text-gray-600'>To get started with PAI ChatBot, simply sign up for an account and follow the onboarding process. Once you're set up, you can start using the chatbot to assist your customers.</p>
            </div>

            <div className='space-y-4'>
                <h3 className='text-xl font-semibold'>Features</h3>
                <p className='text-gray-600'>PAI ChatBot offers a range of features including natural language processing, multi-channel support, and customizable responses. Explore the documentation to learn more about each feature and how to use them effectively.</p>
            </div>

            <div className='space-y-4'>
                <h3 className='text-xl font-semibold'>API Reference</h3>
                <p className='text-gray-600'>The PAI ChatBot API allows you to integrate the chatbot into your own applications. Refer to the API documentation for detailed information on endpoints, request/response formats, and authentication.</p>
            </div>

            <div className='space-y-4'>
                <h3 className='text-4xl font-semibold'>Implementations</h3>
                <ul className='list-disc list-inside text-gray-600 space-y-2'>
                    <li className=''>Build your Preference Customization</li>
                    <li className=''>Generate Embedded Scripts</li>
                    <li className=''>Copy the Embed Code</li>
                    <li className=''>Paste the Code on Your Website</li>
                </ul>
            </div>


            <div className="w-full mx-auto relative z-20">
                <div className="bg-[#0f0f0f] px-4 space-y-4 p-2 border border-gray-700 w-full rounded-lg shadow-lg flex flex-col items-start animate-float animation-delay-4000 h-60">
                    <div className="flex w-full p-3 rounded-t-md items-center mb-2">
                        <div className="w-3 h-3 rounded-full bg-red-600 mr-2"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-600 mr-2"></div>
                        <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>

                        {/* Copy Button When Click then animated*/}
                        <Copy onClick={() => {handleCopyClick()}} style={{ backgroundColor: '#0f0f0f' }} className='ml-auto text-gray-400 cursor-pointer hover:text-gray-200 transition-colors duration-200' size={18} />
                            {
                                copy && (
                                    <div className='absolute top-5 right-15 text-gray-400 px-3 py-1 rounded-full text-xs font-medium animate-pulse'>
                                        Copied!
                                    </div>
                                )
                            }
                    </div>


                    <div className='flex text-sm items-center w-full min-w-0'>
                        <div className='px-5 py-3 text-gray-400 overflow-hidden'>
                            <div className='text-pink-500'>&lt;Script&gt;</div>
                            <div className='text-green-400 text-sm break-words whitespace-normal pl-10'>
                                src=https://www.pichatbot.com/q=long+url&oq=long+url&gs_lcrp
                                data_id=EgZjaHJvbWUyBggAEEUYOTIHCAEQABiABDIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIHCAcQABiABDIHCAgQABiABDIHCAkQABiABNIBCDQ1NjNqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8
                            </div>
                            <div className='text-pink-500'>&lt;/Script&gt;</div>
                        </div>
                    </div>
                </div>
            </div>



        </section>
    )
}

export default Docs
