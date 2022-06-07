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
    thumbnailImage {
      asset-> {
        ...
      }
    },
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
    sector,
    slug {
      current
    }
  },
  "worksArchive": *[_type == "works"] {
    title,
    thumbnailImage {
      asset-> {
        ...
      }
    },
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
    sector,
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
  const [activeType, setActiveType] = useState('all');
  const [activeGenre, setActiveGenre] = useState('all');
  const [activeFilters, setActiveFilters] = useState(false);
  const [current, setCurrent] = useState(0);
  const [hovering, setHovering] = useState(false);

  let retailAndHospitalityLength = 0;
  let workingLength = 0;
  let livingLength = 0;
  let architectureLength = 0;
  let interiorsLength = 0;
  
  for (const e of works) {
    if (e.sector === 'retail-and-hospitality') retailAndHospitalityLength++;
    if (e.sector === 'working') workingLength++;
    if (e.sector === 'living') livingLength++;
    if (e.expertise == 'architecture-and-interiors' || e.expertise == 'architecture') architectureLength++;
    if (e.expertise == 'architecture-and-interiors' || e.expertise == 'interiors') interiorsLength++;
  }

  const updateImage = (e) => {
    setCurrent(e)
  }

  const updateActive = (e) => {
    setActive(e)
    window.scrollTo({ top: 0 });
  }

  const updateType = (e) => {
    if (e == 'all') {
      setActiveFilters(false)
    }
    setActiveGenre('all')
    setActiveType(e)
  }
  
  const updateGenre = (e) => {
    setActiveGenre(e)
    setActiveType('all')
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
            <div className="fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray border-opacity-40 z-40 px-2 py-3 hidden md:flex">
              <div className="mr-auto flex space-x-6">
                <button onClick={() => updateType('all')} className={`block lg:text-xl tracking-tight xl:text-2xl relative md:leading-tight xl:leading-tight group hover:text-black ${ !activeFilters ? 'text-black' : 'text-gray' }`}>
                  <div className="relative overflow-hidden">
                    <span className="block">All</span>
                  </div>

                  <span className="absolute top-0 right-0 text-[10px] leading-none translate-x-[13px] translate-y-[2px]">
                    <span className="block relative overflow-hidden tabular-nums">
                      <span className="block">{works.length}</span>
                    </span>
                  </span>
                </button>

                <button onClick={() => setActiveFilters(true)} className={`block lg:text-xl tracking-tight xl:text-2xl relative md:leading-tight xl:leading-tight group hover:text-black ${ activeFilters ? 'text-black' : 'text-gray' }`}>
                  <div className="relative overflow-hidden">
                    <span className="block">Typology</span>
                  </div>
                </button>

                { activeFilters && (
                  <>
                    <div className="flex space-x-8 md:pl-[3.1vw] xl:pl-[10vw]">
                      <button onClick={() => updateType('retail-and-hospitality')} className={`block lg:text-xl tracking-tight xl:text-2xl relative md:leading-tight xl:leading-tight group hover:text-black ${ activeType == 'retail-and-hospitality' ? 'text-black' : 'text-gray' }`}>
                        <div className="relative overflow-hidden">
                          <span className="block">Retail &amp; Hopsitality</span>
                        </div>

                        <span className="absolute top-0 right-0 text-[10px] leading-none translate-x-[10px] translate-y-[2px]">
                          <span className="block relative overflow-hidden tabular-nums">
                            <span className="block">{retailAndHospitalityLength}</span>
                          </span>
                        </span>
                      </button>

                      <button onClick={() => updateType('working')} className={`block lg:text-xl tracking-tight xl:text-2xl relative md:leading-tight xl:leading-tight group hover:text-black ${ activeType == 'working' ? 'text-black' : 'text-gray' }`}>
                        <div className="relative overflow-hidden">
                          <span className="block">Working</span>
                        </div>

                        <span className="absolute top-0 right-0 text-[10px] leading-none translate-x-[10px] translate-y-[2px]">
                          <span className="block relative overflow-hidden tabular-nums">
                            <span className="block">{workingLength}</span>
                          </span>
                        </span>
                      </button>
                      
                      <button onClick={() => updateType('living')} className={`block lg:text-xl tracking-tight xl:text-2xl relative md:leading-tight xl:leading-tight group hover:text-black ${ activeType == 'living' ? 'text-black' : 'text-gray' }`}>
                        <div className="relative overflow-hidden">
                          <span className="block">Living</span>
                        </div>

                        <span className="absolute top-0 right-0 text-[10px] leading-none translate-x-[10px] translate-y-[2px]">
                          <span className="block relative overflow-hidden tabular-nums">
                            <span className="block">{livingLength}</span>
                          </span>
                        </span>
                      </button>
                    </div>

                    <div className="flex space-x-8 md:pl-[3.1vw] xl:pl-[10vw]">
                      <button onClick={() => updateGenre('architecture')} className={`block lg:text-xl tracking-tight xl:text-2xl relative md:leading-tight xl:leading-tight group hover:text-black ${ activeGenre == 'architecture' ? 'text-black' : 'text-gray' }`}>
                        <div className="relative overflow-hidden">
                          <span className="block">Architecture</span>
                        </div>

                        <span className="absolute top-0 right-0 text-[10px] leading-none translate-x-[10px] translate-y-[2px]">
                          <span className="block relative overflow-hidden tabular-nums">
                            <span className="block">{architectureLength}</span>
                          </span>
                        </span>
                      </button>

                      <button onClick={() => updateGenre('interiors')} className={`block lg:text-xl tracking-tight xl:text-2xl relative md:leading-tight xl:leading-tight group hover:text-black ${ activeGenre == 'interiors' ? 'text-black' : 'text-gray' }`}>
                        <div className="relative overflow-hidden">
                          <span className="block">Interiors</span>
                        </div>

                        <span className="absolute top-0 right-0 text-[10px] leading-none translate-x-[10px] translate-y-[2px]">
                          <span className="block relative overflow-hidden tabular-nums">
                            <span className="block">{interiorsLength}</span>
                          </span>
                        </span>
                      </button>
                    </div>
                  </>
                )}
              </div>

              <div className="ml-auto flex space-x-2">
                <button onClick={() => updateActive('gallery')} className={`block lg:text-xl tracking-tight xl:text-2xl relative md:leading-tight xl:leading-tight overflow-hidden group hover:text-black ${ active == 'gallery' ? 'text-black' : 'text-gray' }`}>
                  <span className="block">Gallery</span>
                </button>
                <button onClick={() => updateActive('archive')} className={`block lg:text-xl tracking-tight xl:text-2xl relative md:leading-tight xl:leading-tight overflow-hidden group hover:text-black ${ active == 'archive' ? 'text-black' : 'text-gray' }`}>
                  <span className="block">Archives</span>
                </button>
              </div>
            </div>
          </m.div>
          <m.article>
            { active == 'gallery' && (
              <ul className="mt-4 md:mt-6 grid grid-cols-10 gap-x-5 gap-y-[5vw] items-end">
                {works.map((e, i) => {
                  let layout = 'col-span-10 md:col-span-3'
                  let height = 'h-[60vw] md:h-[22vw]'
                  let disabledClass = 'grayscale opacity-30'

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
                  if (i == 3) {
                    layout = 'col-span-10 md:col-span-2'
                    height = 'h-[60vw] md:h-[19vw]'
                  }
                  if (i == 4) {
                    layout = 'col-span-10 md:col-start-4 md:col-span-2'
                    height = 'h-[60vw] md:h-[13vw]'
                  }
                  if (i == 5) {
                    layout = 'col-span-10 md:col-start-7 md:col-span-4'
                    height = 'h-[60vw] md:h-[27vw]'
                  }
                  if (i == 6) {
                    layout = 'col-span-10 md:col-span-3'
                    height = 'h-[60vw] md:h-[19vw]'
                  }

                  if (i == 7) {
                    layout = 'col-span-10 md:col-span-2 md:col-start-6'
                    height = 'h-[60vw] md:h-[18vw]'
                  }

                  if (i == 8) {
                    layout = 'col-span-10 md:col-span-2 md:col-start-9'
                    height = 'h-[60vw] md:h-[13vw]'
                  }

                  if (i == 9) {
                    layout = 'col-span-10 md:col-span-2'
                    height = 'h-[60vw] md:h-[24vw]'
                  }

                  if (i == 10) {
                    layout = 'col-span-10 md:col-span-2 md:col-start-4'
                    height = 'h-[60vw] md:h-[18vw]'
                  }

                  if (i == 11) {
                    layout = 'col-span-10 md:col-span-4 md:col-start-7'
                    height = 'h-[60vw] md:h-[27vw]'
                  }

                  if (activeType == 'all' && activeGenre == 'all') {
                    disabledClass = 'grayscale-0 opacity-100'
                  }

                  if (e.sector == activeType) {
                    disabledClass = 'grayscale-0 opacity-100'
                  }

                  if (e.expertise == activeGenre || e.expertise == 'architecture-and-interiors' && activeType == 'all') {
                    disabledClass = 'grayscale-0 opacity-100'
                  }

                  return (
                    <Link href={`/works/${e.slug.current}`} key={i}>
                      <a
                        className={`${layout} block group mb-4 md:mb-0 ${disabledClass}`}
                      >
                        <ReactCursorPosition>
                          <Teaser
                            height={height}
                            image={e.thumbnailImage}
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
                      image={worksArchive[current].thumbnailImage}
                      focalPoint={worksArchive[current].thumbnailImage.hotspot}
                      layout="fill"
                      widthOverride={1000}
                      className={`w-full inset-0 h-full object-cover object-center`}
                    />
                  </div>
                </div>

                <ul className="md:col-start-3 col-span-10 md:col-span-8 w-full block archive-list" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
                  {worksArchive.map((e, i) => {
                    let archiveDisabledClass = 'grayscale opacity-30'
                    
                    if (activeType == 'all' && activeGenre == 'all') {
                      archiveDisabledClass = 'grayscale-0 opacity-100'
                    }
  
                    if (e.sector == activeType) {
                      archiveDisabledClass = 'grayscale-0 opacity-100'
                    }
  
                    if (e.expertise == activeGenre || e.expertise == 'architecture-and-interiors' && activeType == 'all') {
                      archiveDisabledClass = 'grayscale-0 opacity-100'
                    }

                    return (
                      <li className="block" key={i}>
                        <Link href={`/works/${e.slug.current}`} key={i}>
                          <a
                            className={`w-full border-b border-b-[#EFEFEF] flex flex-wrap items-start py-4 group transition-opacity ease-in-out duration-300 relative archive-list__item ${archiveDisabledClass}`}
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