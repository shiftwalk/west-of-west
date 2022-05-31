import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { fade } from '@/helpers/transitions'
import Link from 'next/link'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import SanityPageService from '@/services/sanityPageService'
import { useState } from 'react'
import Image from '@/components/image'
import ReactCursorPosition from 'react-cursor-position'
import Teaser from '@/components/teaser'

const query = `{
  "works": *[_type == "works" && gridProject == true]{
    title,
    heroImages[] {
      asset-> {
        ...,
      },
      caption,
      alt,
      hotspot {
        x,
        y
      },
    },
    expertise,
    slug {
      current
    }
  },
  "worksArchive": *[_type == "works"] {
    title,
    heroImages[] {
      asset-> {
        ...,
      },
      caption,
      alt,
      hotspot {
        x,
        y
      },
    },
    projectCode,
    locationCity,
    locationState,
    expertise,
    year,
    slug {
      current
    }
  }
}`

const pageService = new SanityPageService(query)

export default function Works(initialData) {
  const { data: { works, worksArchive } } = pageService.getPreviewHook(initialData)()
  const [active, setActive] = useState('gallery');
  const [current, setCurrent] = useState(0);
  const [hovering, setHovering] = useState(false);

  const updateImage = (e) => {
    setCurrent(e)
  }


  return (
    <Layout>
      <NextSeo title="Works" />

      <Header active="works" />
      
      <LazyMotion features={domAnimation}>
        <m.main
          initial="initial"
          animate="enter"
          exit="exit"
          className="pt-24 md:pt-32 xl:pt-40"
        >
          <m.div>
            <div className="fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray border-opacity-40 z-40 px-2 py-3 flex">
              <div className="mr-auto flex space-x-2">
                <span className="block lg:text-xl tracking-tight xl:text-2xl relative md:leading-tight xl:leading-tight overflow-hidden">Filters...</span>
              </div>
              <div className="ml-auto flex space-x-2">
                <button onClick={() => setActive('gallery')} className={`block lg:text-xl tracking-tight xl:text-2xl relative md:leading-tight xl:leading-tight overflow-hidden group ${ active == 'gallery' ? 'text-black' : 'text-gray' }`}>
                  <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300">Gallery</span>
                  <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300">Gallery</span>
                </button>
                <button onClick={() => setActive('archive')} className={`block lg:text-xl tracking-tight xl:text-2xl relative md:leading-tight xl:leading-tight overflow-hidden group ${ active == 'archive' ? 'text-black' : 'text-gray' }`}>
                  <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300">Archives</span>
                  <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300">Archives</span>
                </button>
              </div>
            </div>
          </m.div>
          <m.article>
            { active == 'gallery' && (
              <ul className="mt-4 md:mt-6 grid grid-cols-10 gap-5 items-end">
                {works.map((e, i) => {
                  let layout = 'col-span-10 md:col-span-3'
                  let height = 'h-[60vw] md:h-[22vw]'

                  if (i == 0) {
                    layout = 'col-span-10 md:col-span-4'
                    height = 'h-[60vw] md:h-[27vw]'
                  }
                  if (i == 1) {
                    layout = 'col-span-10 md:col-start-6 md:col-span-2'
                    height = 'h-[60vw] md:h-[13vw]'
                  }
                  if (i == 2) {
                    layout = 'col-span-10 md:col-start-9 md:col-span-2'
                    height = 'h-[60vw] md:h-[19vw]'
                  }
                  return (
                    <Link href={`/works/${e.slug.current}`} key={i}>
                      <a href="#" className={`${layout} block group mb-4 md:mb-0`}>
                        <ReactCursorPosition>
                          <Teaser
                            height={height}
                            image={e.heroImages[0]}
                          />
                        </ReactCursorPosition>

                        <span className="block overflow-hidden relative">
                          <span className="block text-lg leading-none mb-1 md:opacity-0 md:group-hover:opacity-100 delay-[0ms]">{e.title}</span>
                        </span>
                        <span className="block overflow-hidden relative">
                          <span className="block text-lg leading-none mb-1 md:opacity-0 md:group-hover:opacity-100  delay-[110ms] text-gray capitalize">{e.expertise.replace(/-/g, ' ')}</span>
                        </span>
                      </a>
                    </Link>
                  )
                })}
              </ul>
            )}
            { active == 'archive' && (
              <div className="grid grid-cols-10 gap-5 mt-6 md:mt-8 items-start">
                <div className="col-span-2 col-start-0">
                  <div className={`w-full h-[12vw] relative overflow-hidden hidden md:block opacity-0 ${hovering ? 'opacity-100' : 'opacity-0' }`}>
                    <Image
                      image={worksArchive[current].heroImages[0]}
                      focalPoint={worksArchive[current].heroImages[0].hotspot}
                      layout="fill"
                      widthOverride={1000}
                      className={`w-full inset-0 h-full object-cover object-center`}
                    />
                  </div>
                </div>

                <ul className="md:col-start-3 col-span-10 md:col-span-8 w-full block archive-list" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
                  {worksArchive.map((e, i) => {
                    return (
                      <li className="block" key={i}>
                        <Link href={`/works/${e.slug.current}`} key={i}>
                          <a
                            className="w-full border-b border-b-[#EFEFEF] flex flex-wrap items-start py-4 group transition-opacity ease-in-out duration-300 relative archive-list__item"
                            onMouseEnter={() => updateImage(i)}
                            onMouseLeave={() => updateImage(i)}
                          >
                            <span className={`absolute top-0 left-0 right-0 w-full h-[1px] bg-[#EFEFEF] ${ i == 0 ? 'mt-[0px]' : 'mt-[-1px]' }`}></span>
                            <span className="block w-auto uppercase text-xs leading-tight overflow-hidden relative pr-4 md:pr-12 xl:pr-20 self-center">
                              <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300">WW.{e.projectCode}</span>
                              <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300">WW.{e.projectCode}</span>
                            </span>
                            <span className="block flex-1 md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-left overflow-hidden relative pr-3">
                              <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300">{e.title}</span>
                              <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300">{e.title}</span>
                            </span>
                            <span className="flex-1 md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-left hidden md:block relative overflow-hidden pr-3">
                              <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300 capitalize">{e.expertise.replace(/-/g, ' ')}</span>
                              <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300 capitalize">{e.expertise.replace(/-/g, ' ')}</span>
                              </span>
                            <span className="block flex-1 md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-left relative overflow-hidden pr-3">
                              <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300">{e.locationCity}{e.locationState && (<>, {e.locationState}</>)}</span>
                              <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300">{e.locationCity}{e.locationState && (<>, {e.locationState}</>)}</span>
                            </span>
                            <span className="block w-[140px] md:w-[150px] xl:w-[160px] md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-right relative overflow-hidden">
                              <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300">{e.year}</span>
                              <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300">{e.year}</span>
                            </span>
                          </a>
                        </Link>
                      </li>
                    )
                  })}
                  {worksArchive.map((e, i) => {
                    return (
                      <li className="block" key={i}>
                        <Link href={`/works/${e.slug.current}`} key={i}>
                          <a
                            className="w-full border-b border-b-[#EFEFEF] flex flex-wrap items-start py-4 group transition-opacity ease-in-out duration-300 relative archive-list__item"
                            onMouseEnter={() => updateImage(i)}
                            onMouseLeave={() => updateImage(i)}
                          >
                            <span className={`absolute top-0 left-0 right-0 w-full h-[1px] bg-[#EFEFEF] ${ i == 0 ? 'mt-[-1px]' : 'mt-[-1px]' }`}></span>
                            <span className="block w-auto uppercase text-xs leading-tight overflow-hidden relative pr-4 md:pr-12 xl:pr-20 self-center">
                              <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300">WW.{e.projectCode}</span>
                              <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300">WW.{e.projectCode}</span>
                            </span>
                            <span className="block flex-1 md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-left overflow-hidden relative pr-3">
                              <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300">{e.title}</span>
                              <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300">{e.title}</span>
                            </span>
                            <span className="flex-1 md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-left hidden md:block relative overflow-hidden pr-3">
                              <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300 capitalize">{e.expertise.replace(/-/g, ' ')}</span>
                              <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300 capitalize">{e.expertise.replace(/-/g, ' ')}</span>
                              </span>
                            <span className="block flex-1 md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-left relative overflow-hidden pr-3">
                              <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300">{e.locationCity}{e.locationState && (<>, {e.locationState}</>)}</span>
                              <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300">{e.locationCity}{e.locationState && (<>, {e.locationState}</>)}</span>
                            </span>
                            <span className="block w-[140px] md:w-[150px] xl:w-[160px] md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-right relative overflow-hidden">
                              <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300">{e.year}</span>
                              <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300">{e.year}</span>
                            </span>
                          </a>
                        </Link>
                      </li>
                    )
                  })}
                  {worksArchive.map((e, i) => {
                    return (
                      <li className="block" key={i}>
                        <Link href={`/works/${e.slug.current}`} key={i}>
                          <a
                            className="w-full border-b border-b-[#EFEFEF] flex flex-wrap items-start py-4 group transition-opacity ease-in-out duration-300 relative archive-list__item"
                            onMouseEnter={() => updateImage(i)}
                            onMouseLeave={() => updateImage(i)}
                          >
                            <span className={`absolute top-0 left-0 right-0 w-full h-[1px] bg-[#EFEFEF] ${ i == 0 ? 'mt-[-1px]' : 'mt-[-1px]' }`}></span>
                            <span className="block w-auto uppercase text-xs leading-tight overflow-hidden relative pr-4 md:pr-12 xl:pr-20 self-center">
                              <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300">WW.{e.projectCode}</span>
                              <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300">WW.{e.projectCode}</span>
                            </span>
                            <span className="block flex-1 md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-left overflow-hidden relative pr-3">
                              <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300">{e.title}</span>
                              <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300">{e.title}</span>
                            </span>
                            <span className="flex-1 md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-left hidden md:block relative overflow-hidden pr-3">
                              <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300 capitalize">{e.expertise.replace(/-/g, ' ')}</span>
                              <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300 capitalize">{e.expertise.replace(/-/g, ' ')}</span>
                              </span>
                            <span className="block flex-1 md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-left relative overflow-hidden pr-3">
                              <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300">{e.locationCity}{e.locationState && (<>, {e.locationState}</>)}</span>
                              <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300">{e.locationCity}{e.locationState && (<>, {e.locationState}</>)}</span>
                            </span>
                            <span className="block w-[140px] md:w-[150px] xl:w-[160px] md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-right relative overflow-hidden">
                              <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300">{e.year}</span>
                              <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300">{e.year}</span>
                            </span>
                          </a>
                        </Link>
                      </li>
                    )
                  })}
                  {worksArchive.map((e, i) => {
                    return (
                      <li className="block" key={i}>
                        <Link href={`/works/${e.slug.current}`} key={i}>
                          <a
                            className="w-full border-b border-b-[#EFEFEF] flex flex-wrap items-start py-4 group transition-opacity ease-in-out duration-300 relative archive-list__item"
                            onMouseEnter={() => updateImage(i)}
                            onMouseLeave={() => updateImage(i)}
                          >
                            <span className={`absolute top-0 left-0 right-0 w-full h-[1px] bg-[#EFEFEF] ${ i == 0 ? 'mt-[-1px]' : 'mt-[-1px]' }`}></span>
                            <span className="block w-auto uppercase text-xs leading-tight overflow-hidden relative pr-4 md:pr-12 xl:pr-20 self-center">
                              <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300">WW.{e.projectCode}</span>
                              <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300">WW.{e.projectCode}</span>
                            </span>
                            <span className="block flex-1 md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-left overflow-hidden relative pr-3">
                              <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300">{e.title}</span>
                              <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300">{e.title}</span>
                            </span>
                            <span className="flex-1 md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-left hidden md:block relative overflow-hidden pr-3">
                              <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300 capitalize">{e.expertise.replace(/-/g, ' ')}</span>
                              <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300 capitalize">{e.expertise.replace(/-/g, ' ')}</span>
                              </span>
                            <span className="block flex-1 md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-left relative overflow-hidden pr-3">
                              <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300">{e.locationCity}{e.locationState && (<>, {e.locationState}</>)}</span>
                              <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300">{e.locationCity}{e.locationState && (<>, {e.locationState}</>)}</span>
                            </span>
                            <span className="block w-[140px] md:w-[150px] xl:w-[160px] md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-right relative overflow-hidden">
                              <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300">{e.year}</span>
                              <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300">{e.year}</span>
                            </span>
                          </a>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </m.article>
        </m.main>
      </LazyMotion>
      
      <div className="pb-16">
        <Footer />
      </div>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const cms = await pageService.fetchQuery(context)

  return {
    props: { ...cms }
  }
}