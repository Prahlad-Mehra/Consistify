import {Mail, Linkedin, Github, Twitter} from 'lucide-react'
import Link from 'next/link';

export default function Footer(){
    return (
    <div className="pt-10 bg-[#111827]">
        <div className="flex justify-center">
            <div className=" inline-flex gap-10 border-b-2 border-[#3f4a64] pb-2">
              <Link href="mailto:prahladmehra98@gmail.com"><Mail className='hover:scale-120' color="#cacaca"/></Link>
                <a href="https://www.linkedin.com/in/prahlad-mehra-907a592a3/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="hover:scale-120" color="#cacaca" />
                </a>
                <a href="https://github.com/Prahlad-Mehra" target="_blank" rel="noopener noreferrer">
                    <Github className="hover:scale-120" color="#cacaca" />
                </a>
                <a href="https://x.com/Prahlad_Mehra25" target="_blank" rel="noopener noreferrer">
                    <Twitter className="hover:scale-120" color="#cacaca" />
                </a>
            </div>
        </div>
        <p className='flex justify-center pt-5 text-[#cacaca] text-xs'>© 2025 Prahlad Mehra. Built with passion.</p>
        <p className='flex justify-center text-[#cacaca] text-xs pt-1 leading-normal pb-4'>Designed & developed with Next.js, React, TypeScript, and Tailwind CSS</p>
    </div>
)
}