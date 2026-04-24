import Navbar from '@/components/landing/nav'
import React from 'react'
import Hero from '@/components/landing/hero/index'
import Docs from '@/components/landing/docs/index'
import Pricing from '@/components/landing/pricing/index'
import Footer from '@/components/landing/footer/index'
import { Toaster } from 'react-hot-toast'
import Contact from '@/components/contact/Contact'
import Chatview from '@/components/chatview/Chatview'


const Page = () => {
  return (
    <main
      className= "flex flex-col w-full"
    >
      <Navbar />
      <Hero />
      <Chatview />
      <Docs />
      <Pricing />
      <Contact />
      <Footer />

      
      
    </main>
  )
}

export default Page
