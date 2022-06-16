import React, { useState } from 'react'
import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion'
import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'
import Clock from 'react-live-clock'
import SanityPageService from '@/services/sanityPageService'
import Image from '@/components/image'

const query = `{
  "home": *[_type == "home"][0]{
    heroFeaturedWorks[] -> {
      title,
      heroImages[] {
        asset-> {
          ...,
        },
        overrideVideo {
          asset-> {
            ...
          }
        },
        caption,
        captionSubHeading,
        alt,
        hotspot {
          x,
          y
        },
      },
      slug {
        current
      }
    }
  }
}`

const pageService = new SanityPageService(query)

export default function Dev(initialData) {
  const { data: { home } } = pageService.getPreviewHook(initialData)() 

  const [introOne, setIntroOne] = useState(false);
  const [introTwo, setIntroTwo] = useState(false);
  const [introThree, setIntroThree] = useState(false);

  const toggleIntroOne = () => {
    setIntroOne(!introOne)
  }
  const toggleIntroTwo = () => {
    setIntroTwo(!introTwo)
  }
  const toggleIntroThree = () => {
    setIntroThree(!introThree)
  }

  return (
    <Layout>
      <NextSeo title="Dev" />

      <Header />
      
      <LazyMotion features={domAnimation}>
        {introOne && (
          <div className="fixed inset-0 h-screen w-full z-[100] bg-white flex items-center justify-center">
            <div className="text-center relative w-full">
              <button onClick={toggleIntroOne} className="fixed top-0 right-0 m-4 z-[100]">Close</button>
              <AnimatePresence>
                {introOne && (
                  <>
                    <m.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0 }}
                      className="block lg:text-xl xl:text-2xl relative md:leading-tight xl:leading-tight tracking-tight"
                    >Architecture</m.span>
                    <m.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0, delay: 0.4 }}
                      className="block lg:text-xl xl:text-2xl md:leading-tight xl:leading-tight tracking-tight absolute inset-0 bg-white"
                    >Interiors</m.span>
                    <m.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0, delay: 0.8 }}
                      className="block lg:text-xl xl:text-2xl md:leading-tight xl:leading-tight tracking-tight absolute inset-0 bg-white"
                    >Portland + Los Angeles</m.span>
                    <m.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0, delay: 1.2 }}
                      className="block w-full absolute inset-0 bg-white"
                    >
                      <div className="mx-auto w-[120px]">
                        <svg className="w-full" viewBox="0 0 120 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M119.998 0H0v34h119.998V0Z" fill="#231F20"/><path d="M15.71 14.55h-.075l-2.02 9.735h-3.432L6.967 10.86H9.85l2.095 10.053h.075l2.057-10.053h3.145l2.057 10.053h.075L21.46 10.86h2.923l-3.25 13.425H17.75l-2.04-9.736ZM33.182 21.33c-.391 1.41-1.713 3.189-4.862 3.189-3.06 0-4.986-2.03-4.986-5.192 0-3.196 1.87-5.236 4.974-5.236 3.105 0 5.21 2.046 4.962 5.773h-7.258c.037 1.646.92 2.783 2.304 2.783 1.44 0 1.993-.892 2.184-1.543l2.682.226Zm-4.877-5.4c-1.397 0-2.164 1.015-2.261 2.244h4.538c-.097-1.23-.864-2.245-2.277-2.245Z" fill="#fff"/><path d="M39.77 17.341c-.209-.98-1.002-1.496-1.961-1.496-.96 0-1.627.414-1.627 1.176 0 .72.726.92 1.745 1.096l1.017.157c1.784.3 3.514.834 3.514 3.058 0 2.175-1.975 3.18-4.569 3.18s-4.396-1.194-4.735-3.131l2.456-.35c.24 1.186 1.077 1.735 2.31 1.735 1.121 0 1.858-.497 1.858-1.33 0-.704-.748-.985-1.87-1.174l-1.09-.174c-1.595-.258-3.279-.822-3.279-2.958 0-1.898 1.929-3.039 4.262-3.039 2.334 0 4.088 1.184 4.391 2.914l-2.421.336ZM47.544 22.24c.266 0 .599 0 .84-.012v2.057c-.252.026-1.079.037-1.726.037-2.027 0-2.908-.44-2.908-2.405v-5.816h-1.584v-1.77h1.593v-2.776h2.618v2.775h2.076v1.771h-2.076v5.156c0 .89.344.984 1.162.984h.005ZM61.672 19.314c0 3.18-1.94 5.205-5.08 5.205s-5.09-2.016-5.09-5.205c0-3.188 1.932-5.215 5.09-5.215 3.159 0 5.08 2.021 5.08 5.215Zm-2.682 0c0-2.137-.935-3.239-2.398-3.239-1.462 0-2.41 1.102-2.41 3.24 0 2.137.935 3.227 2.41 3.227 1.476 0 2.398-1.088 2.398-3.228Z" fill="#fff"/><path d="M66.608 12.42c-.69 0-1.176.203-1.176 1.067v.843h2.078v1.771h-2.078v8.184h-2.63V16.1H61.22v-1.77h1.584v-1.145c0-2.149 1.385-2.747 3.332-2.747.546.008 1.092.05 1.633.125v1.917a12.743 12.743 0 0 0-1.162-.062h.002ZM79.118 14.55h-.075l-2.01 9.735H73.6L70.383 10.86h2.883l2.099 10.053h.075l2.057-10.053h3.141l2.057 10.053h.077l2.106-10.053h2.92l-3.24 13.425h-3.396l-2.044-9.736ZM96.6 21.33c-.393 1.41-1.715 3.189-4.862 3.189-3.062 0-4.988-2.03-4.988-5.192 0-3.196 1.87-5.236 4.974-5.236 3.105 0 5.209 2.053 4.96 5.78h-7.256c.037 1.646.92 2.783 2.306 2.783 1.44 0 1.991-.892 2.182-1.543l2.684.22Zm-4.88-5.4c-1.396 0-2.163 1.015-2.26 2.244H94c-.099-1.23-.865-2.245-2.28-2.245Z" fill="#fff"/><path d="M103.187 17.341c-.208-.98-1.001-1.496-1.962-1.496-.961 0-1.627.414-1.627 1.176 0 .72.726.92 1.747 1.096l1.017.157c1.784.3 3.514.834 3.514 3.058 0 2.175-1.977 3.18-4.571 3.18-2.594 0-4.396-1.194-4.735-3.131l2.456-.35c.241 1.186 1.079 1.735 2.311 1.735 1.122 0 1.857-.497 1.857-1.33 0-.704-.748-.985-1.87-1.174l-1.088-.174c-1.596-.258-3.28-.822-3.28-2.958 0-1.898 1.93-3.039 4.261-3.039 2.332 0 4.083 1.176 4.391 2.906l-2.421.344ZM110.96 22.24c.268 0 .599 0 .842-.012v2.057c-.254.026-1.079.037-1.728.037-2.027 0-2.906-.44-2.906-2.405v-5.816h-1.584v-1.77h1.584v-2.776h2.629v2.775h2.078v1.771h-2.078v5.156c0 .89.344.984 1.163.984Z" fill="#fff"/></svg>
                      </div>
                    </m.span>

                    <m.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, delay: 1.85 }}
                      className="fixed inset-0 w-full h-full"
                    >
                      <div className="bg-gray bg-opacity-40 w-full h-full relative overflow-hidden">
                        <Image
                          image={home.heroFeaturedWorks[0].heroImages[0]}
                          focalPoint={home.heroFeaturedWorks[0].heroImages[0].asset.hotspot}
                          layout="fill"
                          priority
                          widthOverride={1400}
                          className="w-full h-full absolute inset-0 object-cover object-center"
                          noCaption
                        />
                      </div> 
                    </m.span>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {introTwo && (
          <div className="fixed inset-0 h-screen w-full z-[100] bg-blue-500">
            <button onClick={toggleIntroTwo}>Intro Two</button>
          </div>
        )}

        {introThree && (
          <div className="fixed inset-0 h-screen w-full z-[100] bg-green-500">
            <button onClick={toggleIntroThree}>Intro Three</button>
          </div>
        )}
        <m.main
          initial="initial"
          animate="enter"
          exit="exit"
          className="pt-24 md:pt-32 xl:pt-40"
        >
          <m.article>
            <h1 className="text-3xl md:text-4xl xl:text-5xl mb-4">Dev Sandbox</h1>
            <div className="content max-w-3xl mb-4">
              <p>Various work in progress components and playground for dev testing. Not representative of final development, accessibility or design.</p>
            </div>

            <div className="my-16 md:my-24 xl:my-36 content max-w-3xl">
              <h2 className="text-xl md:text-2xl xl:text-3xl mb-4 mt-12">↘ Intro Tests</h2>
              <p>Example of triggering site intros for testing</p>

              <div className="bg-gray bg-opacity-[15%] p-2 max-w-[550px] mt-4 md:mt-6">
                <button onClick={toggleIntroOne} className="block text-xl md:text-2xl group relative overflow-hidden mb-4">
                  <span className="block">Trigger Intro One</span>
                </button>

                <button onClick={toggleIntroTwo} className="block text-xl md:text-2xl group relative overflow-hidden mb-4">
                  <span className="block">Trigger Intro Two</span>
                </button>
                
                <button onClick={toggleIntroThree} className="block text-xl md:text-2xl group relative overflow-hidden">
                  <span className="block">Trigger Intro Three</span>
                </button>
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
                <ul className="md:col-start-3 col-span-10 md:col-span-8 w-full block archive-list">
                  {[...Array(24)].map((e, i) => {
                    return (
                      <li className="block" key={i}>
                        <a href="#" className="w-full border-b border-b-[#EFEFEF] flex flex-wrap items-center py-4 group transition-opacity ease-in-out duration-300 relative archive-list__item">
                        <span className={`absolute top-0 left-0 right-0 w-full h-[1px] bg-[#EFEFEF] ${ i == 0 ? 'mt-[0px]' : 'mt-[-1px]' }`}></span>
                        <span className="block w-auto uppercase text-xs leading-tight overflow-hidden relative">
                          <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300">ww.101</span>
                          <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300">ww.101</span>
                        </span>
                        <span className="block flex-1 md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-center overflow-hidden relative">
                          <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300">Eastbound</span>
                          <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300">Eastbound</span>
                        </span>
                        <span className="flex-1 md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-center hidden md:block relative overflow-hidden">
                          <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300">Architecture, Interiors</span>
                          <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300">Architecture, Interiors</span>
                          </span>
                        <span className="block flex-1 md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-center relative overflow-hidden">
                          <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300">Portland, OR</span>
                          <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300">Portland, OR</span>
                        </span>
                        <span className="block w-auto md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-right relative overflow-hidden">
                          <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300">2021</span>
                          <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300">2021</span>
                        </span>
                        </a>
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

export async function getStaticProps(context) {
  const cms = await pageService.fetchQuery(context)

  return {
    props: { ...cms }
  }
}
