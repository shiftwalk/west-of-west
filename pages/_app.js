import '@/styles/main.css'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import Link from 'next/link'
import React, { useState } from 'react'
import SEO from '@/helpers/seo.config'
import useKeypress from 'react-use-keypress'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [grid, setGrid] = useState(false);

  useKeypress('g', () => {
    setGrid(!grid)
  })

  return (
    <>
      <DefaultSeo {...SEO} />

      { pageProps.preview && (<div className={'fixed bottom-0 left-0 w-auto px-3 py-2 bg-red-600 text-white justify-center flex z-[200] uppercase font-mono text-sm m-3'}>Preview Mode - <a className={'px-1 underline'} href={`/api/exit-preview?currentRoute=${router.route}`}>Click To Exit</a></div>)}

      { grid && (
        <div className="p-2 fixed inset-0 w-full h-full z-[50] pointer-events-none grid grid-cols-10 gap-5">
          <div className="bg-gray bg-opacity-[15%] col-span-1"></div>
          <div className="bg-gray bg-opacity-[15%] col-span-1"></div>
          <div className="bg-gray bg-opacity-[15%] col-span-1"></div>
          <div className="bg-gray bg-opacity-[15%] col-span-1"></div>
          <div className="bg-gray bg-opacity-[15%] col-span-1"></div>
          <div className="bg-gray bg-opacity-[15%] col-span-1"></div>
          <div className="bg-gray bg-opacity-[15%] col-span-1"></div>
          <div className="bg-gray bg-opacity-[15%] col-span-1"></div>
          <div className="bg-gray bg-opacity-[15%] col-span-1"></div>
          <div className="bg-gray bg-opacity-[15%] col-span-1"></div>
        </div>
      )}

      <div className="fixed bottom-0 right-0 m-3 z-[45]">
        <span className="block text-[12px] text-right uppercase font-mono mb-1">'G' - Enable Grid</span>
        
        <Link href="/dev-sandbox">
          <a className="block bg-black text-white px-3 py-2 uppercase leading-none font-mono text-center">
            Dev Sandbox
          </a>
        </Link>
      </div>

      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </>
  )
}