'use client'
import React, { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'



const Contact = () => {
  const [aiMessage, setAiMessage] = useState('')
  const [directMessage, setDirectMessage] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')


//   const handleDirectMailSubmit = async (e) => {
//     e.preventDefault()
    
//     // Validate fields
//     if (!name || !email || !directMessage) {
//       toast.error('Please fill in all fields')
//       return
//     }

//     try {
//       const backendUrl = import.meta.env.VITE_BACKEND_URL

//       const response = await axios.post(`${backendUrl}/mail/send`, {
//         name,
//         email,
//         message: directMessage
//       })

//       if(response.data.success) {
//         toast.success('Email sent successfully!')
//       } else {
//         toast.error('Failed to send email: ' + response.data.message)
//       }

//     } catch (error) {
//       AxiosToastError(error);
//     }

//     setDirectMessage('')
//     setEmail('')
//     setName('')
//   }

  return (
    <section id="contact" className="min-h-screen scroll-smooth bg-gradient-to-r from-[#050508] via-[#1a1a1a] to-[#050508] flex flex-col items-center justify-center px-4 sm:px-8">
      <div className="max-w-8xl w-full">
        {/* Main Contact Cards */}
        <div>
          <div className="bg-gradient-to-br from-[rgb(47,202,8)] to-[rgb(4,71,227)] rounded-3xl shadow-2xl overflow-hidden transform hover:scale-101 transition-all duration-300">
            <div className="p-8 space-y-6">
              {/* Header */}
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">Contact With Me</h2>
                  <p className="text-white/80 text-sm">Direct message to my Mail & I will respond ASAP</p>
                </div>
              </div>

              {/* onSubmit={handleDirectMailSubmit} */}
              {/* Contact Form */}
              <form  className="space-y-4" method='POST'>
                <div className="space-y-2">
                  <label className="text-white text-sm font-semibold">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full p-4 rounded-xl bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-white text-sm font-semibold">Your Email</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full p-4 rounded-xl bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-white text-sm font-semibold">Your Message</label>
                  <textarea
                    value={directMessage}
                    onChange={(e) => setDirectMessage(e.target.value)}
                    placeholder="Tell me about your project..."
                    rows={4}
                    className="w-full p-4 rounded-xl bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full cursor-pointer bg-white hover:bg-black text-[rgb(8,165,202)] font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Send Mail</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact