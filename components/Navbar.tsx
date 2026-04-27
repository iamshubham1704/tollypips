import React from 'react'
import Link from 'next/link'
import DonateButton from './DonateButton'

const Navbar = () => {
    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-black dark:bg-black border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] py-3 px-8 rounded-full transition-all duration-300 w-max">
            <ul className='flex items-center gap-6 text-[20px] font-black uppercase tracking-wider text-white'>
                <li><Link href="/" className="hover:text-pink-500 hover:-translate-y-1 inline-block hover:drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all">Home</Link></li>
                <li><Link href="/#about" className="hover:text-yellow-500 hover:-translate-y-1 inline-block hover:drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all">About</Link></li>
                <li><Link href="/tools" className="hover:text-green-500 hover:-translate-y-1 inline-block hover:drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all">Tools</Link></li>
                <li><DonateButton /></li>
            </ul>
        </nav>
    )
}

export default Navbar