import { Check } from 'lucide-react'
import React from 'react'

const Pricing = () => {
  return (
    <section id="pricing" className='bg-gradient-to-r from-[#050508] via-[#1a1a1a] to-[#050508] py-20 mx-auto text-center px-6'>
      <h2 className='text-2xl font-bold'>Pricing</h2>
      <p className='text-gray-600'>Choose the plan that best fits your needs.</p>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto mt-10'>
        <div className='bg-[#0f0f0f] border border-gray-700 rounded-lg p-6 text-center hover:scale-102 transition-transform duration-200'>
          <h3 className='text-xl font-semibold mb-4'>Free</h3>
          <p className='text-gray-600 mb-6'>Meet your needs with our free plan.</p>
          <h1 className='text-3xl font-bold'>$0/month</h1>
          <button className='px-4 py-2 bg-white text-black rounded-lg hover:bg-black hover:text-white w-full transition-colors duration-200 mt-6'>
            Use Free Plan
          </button>
          <div className='border border-gray-700 my-6'></div>


          <div className='mt-6'>
            <ul className='text-gray-600 space-y-2 mb-6 flex flex-col items-start'>
                <li className='flex items-center gap-2'><Check className='h-4 w-4'/>1000 messages/month</li>
                <li className='flex items-center gap-2'><Check className='h-4 w-4'/>Email support</li>
                <li className='flex items-center gap-2'><Check className='h-4 w-4'/>Basic analytics</li>
            </ul>
          </div>

        </div>


        <div className='bg-[#0f0f0f] border border-gray-700 rounded-lg p-6 text-center hover:scale-102 transition-transform duration-200'>
          <h3 className='text-xl font-semibold mb-4'>Pro</h3>
          <p className='text-gray-600 mb-6'>Unlock advanced features with our Pro plan.</p>
          <h1 className='text-3xl font-bold'>$10/month</h1>
          <button className='px-4 py-2 bg-white text-black rounded-lg hover:bg-black hover:text-white w-full transition-colors duration-200 mt-6'>
            Pro Plan
          </button>
          <div className='border border-gray-700 my-6'></div>


          <div className='mt-6'>
            <ul className='text-gray-600 space-y-2 mb-6 flex flex-col items-start'>
               <li className='flex items-center gap-2'><Check className='h-4 w-4'/>9999 messages/month</li>
                <li className='flex items-center gap-2'><Check className='h-4 w-4'/>Email support</li>
                <li className='flex items-center gap-2'><Check className='h-4 w-4'/>Basic analytics</li>
                <li className='flex items-center gap-2'><Check className='h-4 w-4'/>Priority support</li>
                <li className='flex items-center gap-2'><Check className='h-4 w-4'/>Custom integrations</li>
                <li className='flex items-center gap-2'><Check className='h-4 w-4'/>Advanced analytics</li>
            </ul>
          </div>

        </div>


        <div className='bg-[#0f0f0f] border border-gray-700 rounded-lg p-6 text-center hover:scale-102 transition-transform duration-200'>
          <h3 className='text-xl font-semibold mb-4'>Enterprise</h3>
          <p className='text-gray-600 mb-6'>Meet your needs with our Enterprise plan.</p>
          <h1 className='text-3xl font-bold'>$30/month</h1>
          <button className='px-4 py-2 bg-white text-black rounded-lg hover:bg-black hover:text-white w-full transition-colors duration-200 mt-6'>
            Use Enterprise Plan
          </button>
          <div className='border border-gray-700 my-6'></div>


          <div className='mt-6'>
            <ul className='text-gray-600 space-y-2 mb-6 flex flex-col items-start'>
                <li className='flex items-center gap-2'><Check className='h-4 w-4'/>Unlimited messages</li>
                <li className='flex items-center gap-2'><Check className='h-4 w-4'/>Unlimited Training Data</li>
                <li className='flex items-center gap-2'><Check className='h-4 w-4'/>Basic analytics</li>
                <li className='flex items-center gap-2'><Check className='h-4 w-4'/>Priority support</li>
                <li className='flex items-center gap-2'><Check className='h-4 w-4'/>Custom integrations</li>
                <li className='flex items-center gap-2'><Check className='h-4 w-4'/>Advanced analytics</li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  )
}

export default Pricing
