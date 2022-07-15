import '@/styles/main.css'
import { AnimatePresence, m, LazyMotion, domAnimation } from 'framer-motion'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import React, { useState } from 'react'
import SEO from '@/helpers/seo.config'
import useKeypress from 'react-use-keypress'
import { IntroContext } from '@/context/intro'
import {useIdle} from 'react-use';

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [introContext, setIntroContext] = useState(false);
  const [grid, setGrid] = useState(false);
  const isIdle = useIdle(30e3);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.25,
        staggerChildren: 0.45,
      }
    }
  }
  
const item = {
    hidden: { y: '105%' },
    show: { y: 0 }
  }
  
  
  const introEnd = {
    visible: { opacity: '100%' },
    hidden: { opacity: 0 }
  }

  const revealTranslate = {
    visible: { y: 0 },
    hidden: { y: '105%' }
  }

  const revealTranslateReverse = {
    visible: { y: '105%' },
    hidden: { y: 0 }
  }

  useKeypress('g', () => {
    setGrid(!grid)
  })

  return (
    <>
      <DefaultSeo {...SEO} />
      <IntroContext.Provider value={[introContext, setIntroContext]}>

        <LazyMotion features={domAnimation}>
          <AnimatePresence>
            { isIdle && (
              <m.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={introEnd}
                transition={{ duration: 0.4, ease: [0.83, 0, 0.17, 1] }}
                className="fixed inset-0 bg-white z-[10000] text-black p-2 whitespace-nowrap"
              >
                <m.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {Array.from(Array(40), (e, i) => {
                    return (
                      <div className="relative overflow-hidden mb-4" key={i} style={{ marginLeft: `${i * 2.5}vw` }}>
                        <m.span variants={item} transition={{ duration: 0.75, ease: [0.83, 0, 0.17, 1] }} className={`block text-sm uppercase tracking-tight transform`}>Practice Takes Practise</m.span>
                      </div>
                    )
                  })}
                </m.div>
              </m.div>
            )}
          </AnimatePresence>
          { !introContext && router.asPath == '/' && (
            <m.div 
              initial="visible"
              animate="hidden"
              variants={introEnd}
              transition={{ delay: 2.1, duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
              className="bg-white fixed inset-0 z-[100] pointer-events-none flex flex-col p-[14px] md:p-[20px]"
            >
              <div className="bg-white fixed inset-0 z-[100] pointer-events-none flex flex-col p-[14px] md:p-[20px] h-full">
                <div className="fixed inset-0 w-full z-20 flex items-center justify-center h-full">
                  <div className="overflow-hidden relative">
                    <m.div
                      className="relative w-full text-center"
                      initial="hidden"
                      animate="visible"
                      variants={revealTranslateReverse}
                      transition={{ delay: 1.7, duration: 0.85, ease: [0.83, 0, 0.17, 1]  }}
                    >
                      <div className="block overflow-hidden">
                        <m.span
                          className="w-[120px] h-[34px] bg-[#231F20] block mx-auto"
                          initial="hidden"
                          animate="visible"
                          variants={revealTranslate}
                          transition={{ duration: 0.75, ease: [0.83, 0, 0.17, 1]  }}
                        >
                        </m.span>
                      </div>
                      <div className="block overflow-hidden absolute inset-0 m-0">
                        <m.span
                          initial="hidden"
                          animate="visible"
                          variants={revealTranslate}
                          transition={{ delay: 0.5, duration: 1.3, ease: [0.83, 0, 0.17, 1]  }}
                          className="block w-full"
                        >
                          <div className="mx-auto w-[120px]">
                            <svg className="w-full" viewBox="0 0 120 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M119.998 0H0v34h119.998V0Z" fill="#231F20"/><path d="M15.71 14.55h-.075l-2.02 9.735h-3.432L6.967 10.86H9.85l2.095 10.053h.075l2.057-10.053h3.145l2.057 10.053h.075L21.46 10.86h2.923l-3.25 13.425H17.75l-2.04-9.736ZM33.182 21.33c-.391 1.41-1.713 3.189-4.862 3.189-3.06 0-4.986-2.03-4.986-5.192 0-3.196 1.87-5.236 4.974-5.236 3.105 0 5.21 2.046 4.962 5.773h-7.258c.037 1.646.92 2.783 2.304 2.783 1.44 0 1.993-.892 2.184-1.543l2.682.226Zm-4.877-5.4c-1.397 0-2.164 1.015-2.261 2.244h4.538c-.097-1.23-.864-2.245-2.277-2.245Z" fill="#fff"/><path d="M39.77 17.341c-.209-.98-1.002-1.496-1.961-1.496-.96 0-1.627.414-1.627 1.176 0 .72.726.92 1.745 1.096l1.017.157c1.784.3 3.514.834 3.514 3.058 0 2.175-1.975 3.18-4.569 3.18s-4.396-1.194-4.735-3.131l2.456-.35c.24 1.186 1.077 1.735 2.31 1.735 1.121 0 1.858-.497 1.858-1.33 0-.704-.748-.985-1.87-1.174l-1.09-.174c-1.595-.258-3.279-.822-3.279-2.958 0-1.898 1.929-3.039 4.262-3.039 2.334 0 4.088 1.184 4.391 2.914l-2.421.336ZM47.544 22.24c.266 0 .599 0 .84-.012v2.057c-.252.026-1.079.037-1.726.037-2.027 0-2.908-.44-2.908-2.405v-5.816h-1.584v-1.77h1.593v-2.776h2.618v2.775h2.076v1.771h-2.076v5.156c0 .89.344.984 1.162.984h.005ZM61.672 19.314c0 3.18-1.94 5.205-5.08 5.205s-5.09-2.016-5.09-5.205c0-3.188 1.932-5.215 5.09-5.215 3.159 0 5.08 2.021 5.08 5.215Zm-2.682 0c0-2.137-.935-3.239-2.398-3.239-1.462 0-2.41 1.102-2.41 3.24 0 2.137.935 3.227 2.41 3.227 1.476 0 2.398-1.088 2.398-3.228Z" fill="#fff"/><path d="M66.608 12.42c-.69 0-1.176.203-1.176 1.067v.843h2.078v1.771h-2.078v8.184h-2.63V16.1H61.22v-1.77h1.584v-1.145c0-2.149 1.385-2.747 3.332-2.747.546.008 1.092.05 1.633.125v1.917a12.743 12.743 0 0 0-1.162-.062h.002ZM79.118 14.55h-.075l-2.01 9.735H73.6L70.383 10.86h2.883l2.099 10.053h.075l2.057-10.053h3.141l2.057 10.053h.077l2.106-10.053h2.92l-3.24 13.425h-3.396l-2.044-9.736ZM96.6 21.33c-.393 1.41-1.715 3.189-4.862 3.189-3.062 0-4.988-2.03-4.988-5.192 0-3.196 1.87-5.236 4.974-5.236 3.105 0 5.209 2.053 4.96 5.78h-7.256c.037 1.646.92 2.783 2.306 2.783 1.44 0 1.991-.892 2.182-1.543l2.684.22Zm-4.88-5.4c-1.396 0-2.163 1.015-2.26 2.244H94c-.099-1.23-.865-2.245-2.28-2.245Z" fill="#fff"/><path d="M103.187 17.341c-.208-.98-1.001-1.496-1.962-1.496-.961 0-1.627.414-1.627 1.176 0 .72.726.92 1.747 1.096l1.017.157c1.784.3 3.514.834 3.514 3.058 0 2.175-1.977 3.18-4.571 3.18-2.594 0-4.396-1.194-4.735-3.131l2.456-.35c.241 1.186 1.079 1.735 2.311 1.735 1.122 0 1.857-.497 1.857-1.33 0-.704-.748-.985-1.87-1.174l-1.088-.174c-1.596-.258-3.28-.822-3.28-2.958 0-1.898 1.93-3.039 4.261-3.039 2.332 0 4.083 1.176 4.391 2.906l-2.421.344ZM110.96 22.24c.268 0 .599 0 .842-.012v2.057c-.254.026-1.079.037-1.728.037-2.027 0-2.906-.44-2.906-2.405v-5.816h-1.584v-1.77h1.584v-2.776h2.629v2.775h2.078v1.771h-2.078v5.156c0 .89.344.984 1.163.984Z" fill="#fff"/></svg>
                          </div>
                        </m.span>
                      </div>
                    </m.div>
                  </div>
                </div>
              </div>
            </m.div>
          )}
        </LazyMotion>

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

        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </IntroContext.Provider>
    </>
  )
}