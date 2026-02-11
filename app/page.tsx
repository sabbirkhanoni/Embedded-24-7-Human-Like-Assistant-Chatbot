import Navbar from '@/components/landing/nav'
import React from 'react'
import Hero from '@/components/landing/hero/index'
import Docs from '@/components/landing/docs/index'
import Pricing from '@/components/landing/pricing/index'
import Footer from '@/components/landing/footer/index'

const Page = () => {
  return (
    <main
      className= "flex flex-col w-full"
    >
      <Navbar />
      <Hero />
      <Docs />
      <Pricing />
      <Footer />
    </main>
  )
}

export default Page
