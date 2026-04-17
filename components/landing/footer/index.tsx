import Link from 'next/link'


const Footer = () => {
  return (
    <section className="bg-[#0f0f0f] border-t border-gray-700 py-4">
      <div className="max-w-4xl h-16 mx-auto text-center flex items-center justify-between">
        <Link href={"/"} className='text-2xl font-bold text-zinc-50 flex items-center'>
          <div className='w-5 h-5 bg-white rounded-full flex items-center justify-center'>
            <div className='w-3 h-3 bg-[#050508] rounded-full'></div>
          </div>
            
          <span className='text-sm font-medium ml-2'>PAI ChatBot</span>
        </Link>
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} PAI ChatBot. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          <Link href={"/privacy"} className="text-sm text-gray-400 hover:underline">
            Privacy Policy
          </Link>
          <Link href={"/terms"} className="text-sm text-gray-400 hover:underline">
            Terms of Service
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <a href="https://github.com/your-repo" className="text-sm text-gray-400 hover:underline">
            GitHub
          </a>
          <a href="https://twitter.com/your-profile" className="text-sm text-gray-400 hover:underline">
            Twitter
          </a>
          <a href="https://www.linkedin.com/in/your-profile" className="text-sm text-gray-400 hover:underline">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}

export default Footer
