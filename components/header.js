import { IntroContext } from 'context/intro';
import Link from 'next/link'
import { domAnimation, LazyMotion, m } from 'framer-motion'
import { useContext, useState } from 'react'

export default function Header({ active, works }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [introContext, setIntroContext] = useContext(IntroContext);
  
  const reveal = {
    visible: {y: 0 },
    // hidden: { y: introContext ? 0 : '-105%' }
    hidden: { y: introContext ? 0 : 0 }
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 p-2 z-[60]">
        <LazyMotion features={domAnimation}>
          <div className="grid grid-cols-10 gap-5 overflow-hidden relative">
            <m.div 
              className="col-span-1 col-start-1"
              initial="hidden"
              animate="visible"
              variants={reveal}
              transition={{ delay: introContext ? 0 : 2.65, duration: 0.5, ease: [0.83, 0, 0.17, 1] }}
            >
              <Link href="/">
                <a className="block w-[120px]">
                  <svg className="w-full" viewBox="0 0 120 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M119.998 0H0v34h119.998V0Z" fill="#231F20"/><path d="M15.71 14.55h-.075l-2.02 9.735h-3.432L6.967 10.86H9.85l2.095 10.053h.075l2.057-10.053h3.145l2.057 10.053h.075L21.46 10.86h2.923l-3.25 13.425H17.75l-2.04-9.736ZM33.182 21.33c-.391 1.41-1.713 3.189-4.862 3.189-3.06 0-4.986-2.03-4.986-5.192 0-3.196 1.87-5.236 4.974-5.236 3.105 0 5.21 2.046 4.962 5.773h-7.258c.037 1.646.92 2.783 2.304 2.783 1.44 0 1.993-.892 2.184-1.543l2.682.226Zm-4.877-5.4c-1.397 0-2.164 1.015-2.261 2.244h4.538c-.097-1.23-.864-2.245-2.277-2.245Z" fill="#fff"/><path d="M39.77 17.341c-.209-.98-1.002-1.496-1.961-1.496-.96 0-1.627.414-1.627 1.176 0 .72.726.92 1.745 1.096l1.017.157c1.784.3 3.514.834 3.514 3.058 0 2.175-1.975 3.18-4.569 3.18s-4.396-1.194-4.735-3.131l2.456-.35c.24 1.186 1.077 1.735 2.31 1.735 1.121 0 1.858-.497 1.858-1.33 0-.704-.748-.985-1.87-1.174l-1.09-.174c-1.595-.258-3.279-.822-3.279-2.958 0-1.898 1.929-3.039 4.262-3.039 2.334 0 4.088 1.184 4.391 2.914l-2.421.336ZM47.544 22.24c.266 0 .599 0 .84-.012v2.057c-.252.026-1.079.037-1.726.037-2.027 0-2.908-.44-2.908-2.405v-5.816h-1.584v-1.77h1.593v-2.776h2.618v2.775h2.076v1.771h-2.076v5.156c0 .89.344.984 1.162.984h.005ZM61.672 19.314c0 3.18-1.94 5.205-5.08 5.205s-5.09-2.016-5.09-5.205c0-3.188 1.932-5.215 5.09-5.215 3.159 0 5.08 2.021 5.08 5.215Zm-2.682 0c0-2.137-.935-3.239-2.398-3.239-1.462 0-2.41 1.102-2.41 3.24 0 2.137.935 3.227 2.41 3.227 1.476 0 2.398-1.088 2.398-3.228Z" fill="#fff"/><path d="M66.608 12.42c-.69 0-1.176.203-1.176 1.067v.843h2.078v1.771h-2.078v8.184h-2.63V16.1H61.22v-1.77h1.584v-1.145c0-2.149 1.385-2.747 3.332-2.747.546.008 1.092.05 1.633.125v1.917a12.743 12.743 0 0 0-1.162-.062h.002ZM79.118 14.55h-.075l-2.01 9.735H73.6L70.383 10.86h2.883l2.099 10.053h.075l2.057-10.053h3.141l2.057 10.053h.077l2.106-10.053h2.92l-3.24 13.425h-3.396l-2.044-9.736ZM96.6 21.33c-.393 1.41-1.715 3.189-4.862 3.189-3.062 0-4.988-2.03-4.988-5.192 0-3.196 1.87-5.236 4.974-5.236 3.105 0 5.209 2.053 4.96 5.78h-7.256c.037 1.646.92 2.783 2.306 2.783 1.44 0 1.991-.892 2.182-1.543l2.684.22Zm-4.88-5.4c-1.396 0-2.163 1.015-2.26 2.244H94c-.099-1.23-.865-2.245-2.28-2.245Z" fill="#fff"/><path d="M103.187 17.341c-.208-.98-1.001-1.496-1.962-1.496-.961 0-1.627.414-1.627 1.176 0 .72.726.92 1.747 1.096l1.017.157c1.784.3 3.514.834 3.514 3.058 0 2.175-1.977 3.18-4.571 3.18-2.594 0-4.396-1.194-4.735-3.131l2.456-.35c.241 1.186 1.079 1.735 2.311 1.735 1.122 0 1.857-.497 1.857-1.33 0-.704-.748-.985-1.87-1.174l-1.088-.174c-1.596-.258-3.28-.822-3.28-2.958 0-1.898 1.93-3.039 4.261-3.039 2.332 0 4.083 1.176 4.391 2.906l-2.421.344ZM110.96 22.24c.268 0 .599 0 .842-.012v2.057c-.254.026-1.079.037-1.728.037-2.027 0-2.906-.44-2.906-2.405v-5.816h-1.584v-1.77h1.584v-2.776h2.629v2.775h2.078v1.771h-2.078v5.156c0 .89.344.984 1.163.984Z" fill="#fff"/></svg>
                </a>
              </Link>
            </m.div>
            
            <div className="hidden md:flex space-x-1 col-start-3 col-span-2">
              <m.div
                initial="hidden"
                animate="visible"
                variants={reveal}
                transition={{ delay: introContext ? 0 : 2.65, duration: 0.5, ease: [0.83, 0, 0.17, 1] }}
              >
                <Link href="/studio">
                  <a className={`block lg:text-xl xl:text-2xl relative md:leading-tight xl:leading-tight overflow-hidden hover:text-black focus-visible:text-black hover:opacity-100 focus-visible:opacity-100 transition ease-in-out duration-300 mix-blend ${hovering ? 'opacity-30' : 'text-black' } ${ (active == 'studio' || active == 'home') ? 'text-black' : 'opacity-30' } hover:text-black focus-visible:text-black hover:opacity-100 focus-visible:opacity-100 ${ (active == 'home' || active !== 'studio') ? 'group' : '' }`} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
                    <span className="block">Studio,</span>
                  </a>
                </Link>
              </m.div>

              <m.div
                initial="hidden"
                animate="visible"
                variants={reveal}
                transition={{ delay: introContext ? 0 : 2.65, duration: 0.5, ease: [0.83, 0, 0.17, 1] }}
              >
                <Link href="/works">
                  <a className={`block lg:text-xl xl:text-2xl relative md:leading-tight xl:leading-tight hover:text-black focus-visible:text-black hover:opacity-100 focus-visible:opacity-100 transition ease-in-out duration-300 ${hovering ? 'opacity-30' : 'text-black' } ${ (active == 'works' || active == 'home') ? 'text-black' : 'opacity-30' } hover:text-black focus-visible:text-black hover:opacity-100 focus-visible:opacity-100 ${ (active == 'home' || active !== 'works') ? 'group' : '' }`} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
                    <div className="relative overflow-hidden">
                      <span className="block">Works</span>
                    </div>

                    <span className="absolute top-0 right-0 text-[11px] leading-none translate-x-[14px] translate-y-[3px]">
                      <span className="block relative overflow-hidden">
                        <span className="block">{works ?? null}</span>
                      </span>
                    </span>
                  </a>
                </Link>
              </m.div>
            </div>
            
            <div className="flex md:hidden col-start-8 col-span-3 justify-end items-center">
              <m.div
                initial="hidden"
                animate="visible"
                variants={reveal}
                transition={{ delay: introContext ? 0 : 2.65, duration: 0.5, ease: [0.83, 0, 0.17, 1] }}
              >
                <button onClick={toggleMenu} className={`block lg:text-xl xl:text-2xl relative md:leading-tight xl:leading-tight overflow-hidden ${menuOpen ? 'text-black' : '' }`}>
                  <span className="block">
                    <span className="block w-[39px] bg-black h-[3px] mb-[5px]"></span>
                    <span className="block w-[39px] bg-black h-[3px]"></span>
                  </span>
                </button>
              </m.div>
            </div>

            <div className="hidden md:flex space-x-1 col-span-2 col-start-7">
              <m.div
                initial="hidden"
                animate="visible"
                variants={reveal}
                transition={{ delay: introContext ? 0 : 2.65, duration: 0.5, ease: [0.83, 0, 0.17, 1] }}
              >
                <Link href="/journal">
                  <a className={`block lg:text-xl xl:text-2xl relative md:leading-tight xl:leading-tight overflow-hidden hover:text-black focus-visible:text-black hover:opacity-100 focus-visible:opacity-100 transition ease-in-out duration-300 ${hovering ? 'opacity-30' : 'text-black' } ${ (active == 'journal' || active == 'home') ? 'text-black' : 'opacity-30' } hover:text-black focus-visible:text-black hover:opacity-100 focus-visible:opacity-100 ${ (active == 'home' || active !== 'journal') ? 'group' : '' }`} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
                    <span className="block">Journal,</span>
                  </a>
                </Link>
              </m.div>
              
              <m.div
                initial="hidden"
                animate="visible"
                variants={reveal}
                transition={{ delay: introContext ? 0 : 2.65, duration: 0.5, ease: [0.83, 0, 0.17, 1] }}
              >
                <Link href="/contact">
                  <a className={`block lg:text-xl xl:text-2xl relative md:leading-tight xl:leading-tight overflow-hidden hover:text-black focus-visible:text-black hover:opacity-100 focus-visible:opacity-100 transition ease-in-out duration-300 ${hovering ? 'opacity-30' : 'text-black' } ${ (active == 'contact' || active == 'home') ? 'text-black' : 'opacity-30' } hover:text-black focus-visible:text-black hover:opacity-100 focus-visible:opacity-100 ${ (active == 'home' || active !== 'contact') ? 'group' : '' }`} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
                    <span className="block">Contact</span>
                  </a>
                </Link>
              </m.div>
            </div>
            
            <div className="hidden md:block col-span-2 col-start-9 text-right">
              <m.div
                initial="hidden"
                animate="visible"
                variants={reveal}
                transition={{ delay: introContext ? 0 : 2.65, duration: 0.5, ease: [0.83, 0, 0.17, 1] }}
              >
                <a href="https://www.instagram.com/west_of_west/?hl=en" target="_blank" rel="noreferrer noopener" className={`inline-block lg:text-xl xl:text-2xl md:leading-tight xl:leading-tight group relative overflow-hidden hover:text-black focus-visible:text-black hover:opacity-100 focus-visible:opacity-100 transition ease-in-out duration-300 ${hovering ? 'opacity-30' : 'text-black' } ${ active == 'home' ? 'text-black' : 'opacity-30' }`} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
                  <span className="block">Instagram</span>
                </a>
              </m.div>
            </div>
          </div>
        </LazyMotion>
      </header>
        
      {menuOpen && (
        <div className="flex flex-wrap items-center md:hidden fixed inset-0 w-full h-full bg-white z-[50] pt-24 px-2">
          <ul className="w-full -mt-20">
            <li className="block border-b border-t">
              <Link href="/studio">
                <a onClick={() => setMenuOpen(false)} className={`block text-[50px] relative leading-[1] pt-[7px] pb-[11px]`}>Studio</a>
              </Link>
            </li>
            <li className="block border-b">
              <Link href="/works">
                <a onClick={() => setMenuOpen(false)} className={`block text-[50px] relative leading-[1] pt-[7px] pb-[11px]`}>
                  <div className="relative inline-block">
                    Works

                    <span className="absolute top-0 right-0 text-[13px] leading-none translate-x-[14px] translate-y-[3px]">
                      <span className="block relative overflow-hidden">
                        <span className="block">{works ?? null}</span>
                      </span>
                    </span>
                  </div>
                </a>
              </Link>
            </li>
            <li className="block border-b">
              <Link href="/journal">
                <a onClick={() => setMenuOpen(false)} className={`block text-[50px] relative leading-[1] pt-[7px] pb-[11px]`}>Journal</a>
              </Link>
            </li>
            <li className="block border-b mb-12">
              <Link href="/contact">
                <a onClick={() => setMenuOpen(false)} className={`block text-[50px] relative leading-[1] pt-[7px] pb-[11px]`}>Contact</a>
              </Link>
            </li>

            <li className="block">
              <a onClick={() => setMenuOpen(false)} href="tel:971-266-1001" target="_blank" rel="noreferrer noopener" className={`block text-[18px] relative leading-tight mb-1 underline`}>971-266-1001</a>
            </li>
            <li className="block">
              <a onClick={() => setMenuOpen(false)} href="mailto:info@westofwest.com" target="_blank" rel="noreferrer noopener" className={`block text-[18px] relative leading-tight mb-1 underline`}>info@westofwest.com</a>
            </li>
            <li className="block">
              <a onClick={() => setMenuOpen(false)} href="https://www.instagram.com/west_of_west/?hl=en" target="_blank" rel="noreferrer noopener" className={`block text-[18px] relative leading-tight mb-1 underline`}>Instagram</a>
            </li>
          </ul>

          <div className="flex items-end w-full absolute bottom-0 left-0 right-0 p-2">
            <div className="relative flex overflow-x-hidden text-xs w-full md:w-auto">
              <div className="animate-marquee whitespace-nowrap">
                <span className="mx-[3px] leading-tight uppercase">Quality above all else</span>
                <span className="mx-[3px] leading-tight uppercase">—</span>
                <span className="mx-[3px] leading-tight uppercase">Practise takes practise</span>
                <span className="mx-[3px] leading-tight uppercase">—</span>
                <span className="mx-[3px] leading-tight uppercase">Quality above all else</span>
                <span className="mx-[3px] leading-tight uppercase">—</span>
                <span className="mx-[3px] leading-tight uppercase">Practise takes practise</span>
                <span className="mx-[3px] leading-tight uppercase">—</span>
                <span className="mx-[3px] leading-tight uppercase">Quality above all else</span>
                <span className="mx-[3px] leading-tight uppercase">—</span>
              </div>

              <div className="absolute top-0 animate-marquee2 whitespace-nowrap">
                <span className="mx-[3px] leading-tight uppercase">Quality above all else</span>
                <span className="mx-[3px] leading-tight uppercase">—</span>
                <span className="mx-[3px] leading-tight uppercase">Practise takes practise</span>
                <span className="mx-[3px] leading-tight uppercase">—</span>
                <span className="mx-[3px] leading-tight uppercase">Quality above all else</span>
                <span className="mx-[3px] leading-tight uppercase">—</span>
                <span className="mx-[3px] leading-tight uppercase">Practise takes practise</span>
                <span className="mx-[3px] leading-tight uppercase">—</span>
                <span className="mx-[3px] leading-tight uppercase">Quality above all else</span>
                <span className="mx-[3px] leading-tight uppercase">—</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}