import React from 'react'
import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import { ObjViewer } from 'react-obj-viewer'
import dynamic from 'next/dynamic'
import Clock from 'react-live-clock'

const OBJModel = dynamic(
  ()=>import('react-3d-viewer').then((mod) => mod.OBJModel),
  {ssr: false}
)

export default function Dev() {
  return (
    <Layout>
      <NextSeo title="Dev" />

      <Header />
      
      <LazyMotion features={domAnimation}>
        <m.main
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <m.article>
            <h1 className="text-3xl md:text-4xl xl:text-5xl mb-4">Dev Sandbox</h1>
            <div className="content max-w-3xl mb-4">
              <p>Various work in progress components and playground for dev testing. Not representative of final development, accessibility or design.</p>
            </div>
            
            <div className="my-16 md:my-24 xl:my-36 content max-w-3xl">
              <h2 className="text-xl md:text-2xl xl:text-3xl mb-4 mt-12">↘ .obj Viewer</h2>
              <p>Example of loading in an .obj file from the CMS.</p>

              <div className="bg-gray bg-opacity-[15%] p-2 max-w-[550px] mt-4 md:mt-6">
                <OBJModel src="/3d/test.obj" />
              </div>
            </div>

            <div className="my-16 md:my-24 xl:my-36">
              <h2 className="text-xl md:text-2xl xl:text-3xl mb-4 mt-12">↘ Indent Headings</h2>
            
              <p>Example of larger viewport width driven, indented headings</p>
              
              <span className="block indent-[24.25%] text-[9vw] md:text-[7.25vw] xl:text-[5.85vw] leading-none md:leading-none xl:leading-none max-w-[80vw] mt-4 md:mt-6">We are an architecture &amp; design studio that creates experience driven buildings and interiors.</span>
            </div>

            <div className="my-16 md:my-24 xl:my-36 content max-w-3xl">
              <h2 className="text-xl md:text-2xl xl:text-3xl mb-4 mt-12">↘ Inline Links</h2>
              
              <p>Example of inline link hover / focus styling.</p>

              <div className="flex space-x-5 mt-4 md:mt-6">
                <a href="#" className="block text-xl md:text-2xl group relative overflow-hidden">
                  <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300 delay-[50ms]">Our Studio</span>
                  <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300 delay-[50ms]">Our Studio</span>
                  <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
                </a>
                <a href="#" className="block text-xl md:text-2xl group relative overflow-hidden">
                  <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300 delay-[50ms]">Explore Works</span>
                  <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300 delay-[50ms]">Explore Works</span>
                  <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
                </a>
              </div>
            </div>

            <div className="my-16 md:my-24 xl:my-36 content">
              <h2 className="text-xl md:text-2xl xl:text-3xl mb-4 mt-12">↘ Teaser Hovers</h2>
              
              <p>Example of teaser hover / focus styles</p>
              <div className="flex flex-wrap md:flex-nowrap md:space-x-5 mt-4 md:mt-6 max-w-[80vw]">
                <a href="#" className="block w-full md:w-1/3 group mb-4 md:mb-0">
                  <div className="relative overflow-hidden mb-3">
                    <img src="images/test.jpg" className="w-full" alt="test" />
                    <div className="bg-black bg-opacity-40 flex items-center justify-center absolute inset-0 z-10 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity ease-in-out duration-500">
                      <svg className="w-10" viewBox="0 0 34 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke="#fff" stroke-width="2" d="M34 17.903H0M16.822 35.002V.998"/></svg>
                    </div>
                  </div>
                  <span className="block text-lg leading-none mb-1">Flats House</span>
                  <span className="block text-lg leading-none text-gray">Architecture</span>
                </a>

                <a href="#" className="block w-full md:w-1/3 group mb-4 md:mb-0">
                  <div className="relative overflow-hidden mb-3">
                    <img src="images/test.jpg" className="w-full" alt="test" />
                    <div className="bg-black bg-opacity-40 absolute inset-0 z-10 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity ease-in-out duration-500 p-3">
                      <svg className="w-10 translate-x-[-150%] group-hover:translate-x-0 transition-translate ease-in-out duration-500 delay-[50ms]" viewBox="0 0 42 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m30.183 0-1.986 2.017 8.426 8.557H0v2.852h36.623l-8.426 8.557L30.183 24 42 12 30.183 0Z" fill="#fff"/></svg>

                      <div className="absolute bottom-0 right-0 p-3 text-right">
                        <span className="block text-xl leading-none mb-1 text-white relative overflow-hidden">
                          <span className="block translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-500 text-2xl leading-none text-white delay-[50ms]">Flats House</span>
                        </span>
                        <span className="block translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-500 text-2xl leading-none text-gray delay-[50ms]">Living</
                        span>
                      </div>
                    </div>
                  </div>
                </a>

                <a href="#" className="block w-full md:w-1/3 group mb-4 md:mb-0">
                  <div className="relative overflow-hidden mb-3">
                    <img src="images/test.jpg" className="w-full" alt="test" />
                    <div className="bg-black bg-opacity-40 flex items-center justify-center absolute inset-0 z-10 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity ease-in-out duration-500">
                      <svg className="w-10" viewBox="0 0 34 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke="#fff" stroke-width="2" d="M34 17.903H0M16.822 35.002V.998"/></svg>
                    </div>
                  </div>
                  <span className="block overflow-hidden relative">
                    <span className="block text-lg leading-none mb-1 translate-y-[105%] group-hover:translate-y-0 transition-translate ease-in-out duration-500 delay-[50ms]">Flats House</span>
                  </span>
                  <span className="block overflow-hidden relative">
                    <span className="block text-lg leading-none mb-1 translate-y-[105%] group-hover:translate-y-0 transition-translate ease-in-out duration-500 delay-[50ms] text-gray">Architecture</span>
                  </span>
                </a>
              </div>
            </div>

            <div className="my-16 md:my-24 xl:my-36 content max-w-3xl">
              <h2 className="text-xl md:text-2xl xl:text-3xl mb-4 mt-12">↘ Clock Ticker</h2>
              
              <p>Example of clock ticking functionality.</p>

              <div className="flex space-x-16 mt-6 md:mt-8">
                <div>
                  <span className="block text-lg leading-tight">Portland<br/> 110 SE Main St,<br/>Suite 3000<br/> Portland, OR. 97214</span>

                  <span className="block text-lg leading-tight mt-2"><span className="tabular-nums"><Clock format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} /></span></span>
                </div>

                <div>
                  <span className="block text-lg leading-tight">Los Angeles<br/> 970 N Broadway<br/> Suite 206<br/> Los Angeles, CA. 90012</span>

                  <span className="block text-lg leading-tight mt-2"><span className="tabular-nums"><Clock format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} /></span></span>
                </div>
              </div>
            </div>

            <div className="my-16 md:my-24 xl:my-36 content">
              <h2 className="text-xl md:text-2xl xl:text-3xl mb-4 mt-12">↘ Archive List</h2>
              
              <p>Example of archive listings.</p>

              <div className="grid grid-cols-10 gap-5 mt-6 md:mt-8">
                <ul className="md:col-start-3 col-span-10 md:col-span-8 w-full block border-t border-t-gray border-opacity-30">
                  {[...Array(24)].map((i) => {
                    return (
                      <li className="border-b border-b-gray border-opacity-30 flex flex-wrap items-center py-4" key={i}>
                        <span className="block w-auto uppercase text-xs leading-none">ww.101</span>
                        <span className="block flex-1 md:text-lg xl:text-xl md:leading-none xl:leading-none text-center">Eastbound</span>
                        <span className="flex-1 md:text-lg xl:text-xl md:leading-none xl:leading-none text-center hidden md:block">Architecture, Interiors</span>
                        <span className="block flex-1 md:text-lg xl:text-xl md:leading-none xl:leading-none text-center">Portland, OR</span>
                        <span className="block w-auto md:text-lg xl:text-xl md:leading-none xl:leading-none text-right">2021</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </m.article>
        </m.main>
      </LazyMotion>

      <Footer />
    </Layout>
  )
}
