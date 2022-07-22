import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { fade } from '@/helpers/transitions'
import Link from 'next/link'
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion'
import { NextSeo } from 'next-seo'
import SanityPageService from '@/services/sanityPageService'
import { useContext, useEffect, useState } from 'react'
import Image from '@/components/image'
import ReactCursorPosition from 'react-cursor-position'
import Teaser from '@/components/teaser'
import { IntroContext } from 'context/intro'
import Typewriter from 'typewriter-effect'

const query = `{
  "works": *[_type == "works" && gridProject == true] | order(orderRank){
    title,
    thumbnailImage {
      asset-> {
        ...
      },
      overrideVideo {
        asset-> {
          ...
        }
      },
      caption,
      alt,
      hotspot {
        x,
        y
      },
    },
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
  "worksArchive": *[_type == "works"] | order(projectCode desc) {
    title,
    nonRoutedProjects,
    thumbnailImage {
      asset-> {
        ...
      },
      overrideVideo {
        asset-> {
          ...
        }
      },
      caption,
      alt,
      hotspot {
        x,
        y
      },
    },
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
  },
  "worksAll": *[_type == "works"]{
    title
  }
}`

const pageService = new SanityPageService(query)

export default function Works(initialData) {
  const { data: { works, worksArchive, worksAll } } = pageService.getPreviewHook(initialData)()
  const [active, setActive] = useState('gallery');
  const [activeType, setActiveType] = useState('all');
  const [activeGenre, setActiveGenre] = useState('all');
  const [activeFilters, setActiveFilters] = useState(false);
  const [current, setCurrent] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [introContext, setIntroContext] = useContext(IntroContext);

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

  useEffect(() => {
    setIntroContext(true)
  },[]);

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
  
  const updateTypeAndTray = (e) => {
    setActiveFilters(true)

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

      <Header active="works" works={worksAll.length} />
      
      <LazyMotion features={domAnimation}>
        <m.main
          variants={fade}
          initial="initial"
          animate="enter"
          exit="exit"
          className="pt-24 md:pt-32 xl:pt-40"
        >
          <m.div>
            <div className="fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray border-opacity-40 z-40 px-2 py-3 hidden lg:flex">
              <div className="mr-auto flex space-x-6">
                <button onClick={() => updateType('all')} className={`block lg:text-xl tracking-tight xl:text-2xl relative md:leading-tight xl:leading-tight group hover:text-black ${ !activeFilters ? 'text-black' : 'text-gray' }`}>
                  <div className="relative overflow-hidden">
                    <span className="block">All</span>
                  </div>

                  <span className="absolute top-0 right-0 text-[10px] leading-none translate-x-[13px] translate-y-[2px]">
                    <span className="block relative overflow-hidden tabular-nums">
                      <span className="block">{worksAll.length}</span>
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
                      <button onClick={() => updateType('living')} className={`block lg:text-xl tracking-tight xl:text-2xl relative md:leading-tight xl:leading-tight group hover:text-black ${ activeType == 'living' ? 'text-black' : 'text-gray' }`}>
                        <div className="relative overflow-hidden">
                          <span className="block">Living</span>
                        </div>

                        <span className="absolute top-0 right-0 text-[10px] leading-none translate-x-[13px] translate-y-[2px]">
                          <span className="block relative tabular-nums">
                            <span className="block">{livingLength}</span>
                          </span>
                        </span>
                      </button>

                      <button onClick={() => updateType('working')} className={`block lg:text-xl tracking-tight xl:text-2xl relative md:leading-tight xl:leading-tight group hover:text-black ${ activeType == 'working' ? 'text-black' : 'text-gray' }`}>
                        <div className="relative overflow-hidden">
                          <span className="block">Working</span>
                        </div>

                        <span className="absolute top-0 right-0 text-[10px] leading-none translate-x-[13px] translate-y-[2px]">
                          <span className="block relative overflow-hidden tabular-nums">
                            <span className="block">{workingLength}</span>
                          </span>
                        </span>
                      </button>

                      <button onClick={() => updateType('retail-and-hospitality')} className={`block lg:text-xl tracking-tight xl:text-2xl relative md:leading-tight xl:leading-tight group hover:text-black ${ activeType == 'retail-and-hospitality' ? 'text-black' : 'text-gray' }`}>
                        <div className="relative overflow-hidden">
                          <span className="block">Retail &amp; Hospitality</span>
                        </div>

                        <span className="absolute top-0 right-0 text-[10px] leading-none translate-x-[13px] translate-y-[2px]">
                          <span className="block relative overflow-hidden tabular-nums">
                            <span className="block">{retailAndHospitalityLength}</span>
                          </span>
                        </span>
                      </button>
                    </div>

                    <div className="flex space-x-8 md:pl-[3.1vw] xl:pl-[10vw]">
                      <button onClick={() => updateGenre('architecture')} className={`block lg:text-xl tracking-tight xl:text-2xl relative md:leading-tight xl:leading-tight group hover:text-black ${ activeGenre == 'architecture' ? 'text-black' : 'text-gray' }`}>
                        <div className="relative overflow-hidden">
                          <span className="block">Architecture</span>
                        </div>

                        <span className="absolute top-0 right-0 text-[10px] leading-none translate-x-[13px] translate-y-[2px]">
                          <span className="block relative overflow-hidden tabular-nums">
                            <span className="block">{architectureLength}</span>
                          </span>
                        </span>
                      </button>

                      <button onClick={() => updateGenre('interiors')} className={`block lg:text-xl tracking-tight xl:text-2xl relative md:leading-tight xl:leading-tight group hover:text-black ${ activeGenre == 'interiors' ? 'text-black' : 'text-gray' }`}>
                        <div className="relative overflow-hidden">
                          <span className="block">Interiors</span>
                        </div>

                        <span className="absolute top-0 right-0 text-[10px] leading-none translate-x-[13px] translate-y-[2px]">
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
          
          {/* MOBILE FILTERS */}
          <div className="block lg:hidden mb-4 md:mb-0">
            <button onClick={() => updateType('all')} className={`block text-lg leading-tight lg:text-xl tracking-tight xl:text-2xl relative md:leading-tight xl:leading-tight group hover:text-black ${ activeType == 'all' ? 'text-black' : 'text-gray' }`}>
              <div className="relative overflow-hidden">
                <span className="block">All</span>
              </div>

              <span className="absolute top-0 right-0 text-[10px] leading-none translate-x-[15px] md:translate-x-[13px] translate-y-[2px]">
                <span className="block relative overflow-hidden tabular-nums">
                  <span className="block">{worksAll.length}</span>
                </span>
              </span>
            </button>

            <button onClick={() => updateType('working')} className={`block text-lg leading-tight lg:text-xl tracking-tight xl:text-2xl relative md:leading-tight xl:leading-tight group hover:text-black ${ activeType == 'working' ? 'text-black' : 'text-gray' }`}>
              <div className="relative overflow-hidden">
                <span className="block">Working</span>
              </div>

              <span className="absolute top-0 right-0 text-[10px] leading-none translate-x-[15px] md:translate-x-[13px] translate-y-[2px]">
                <span className="block relative overflow-hidden tabular-nums">
                  <span className="block">{workingLength}</span>
                </span>
              </span>
            </button>

            <button onClick={() => updateType('living')} className={`block text-lg leading-tight lg:text-xl tracking-tight xl:text-2xl relative md:leading-tight xl:leading-tight group hover:text-black ${ activeType == 'living' ? 'text-black' : 'text-gray' }`}>
              <div className="relative overflow-hidden">
                <span className="block">Living</span>
              </div>

              <span className="absolute top-0 right-0 text-[10px] leading-none translate-x-[15px] md:translate-x-[13px] translate-y-[2px]">
                <span className="block relative overflow-hidden tabular-nums">
                  <span className="block">{livingLength}</span>
                </span>
              </span>
            </button>

            <button onClick={() => updateType('retail-and-hospitality')} className={`block text-lg leading-tight lg:text-xl tracking-tight xl:text-2xl relative md:leading-tight xl:leading-tight group hover:text-black mb-3 ${ activeType == 'retail-and-hospitality' ? 'text-black' : 'text-gray' }`}>
              <div className="relative overflow-hidden">
                <span className="block">Retail &amp; Hospitality</span>
              </div>

              <span className="absolute top-0 right-0 text-[10px] leading-none translate-x-[15px] md:translate-x-[13px] translate-y-[2px]">
                <span className="block relative overflow-hidden tabular-nums">
                  <span className="block">{retailAndHospitalityLength}</span>
                </span>
              </span>
            </button>
          
            <button onClick={() => updateGenre('architecture')} className={`block text-lg leading-tight lg:text-xl tracking-tight xl:text-2xl relative md:leading-tight xl:leading-tight group hover:text-black ${ activeGenre == 'architecture' ? 'text-black' : 'text-gray' }`}>
              <div className="relative overflow-hidden">
                <span className="block">Architecture</span>
              </div>

              <span className="absolute top-0 right-0 text-[10px] leading-none translate-x-[15px] md:translate-x-[13px] translate-y-[2px]">
                <span className="block relative overflow-hidden tabular-nums">
                  <span className="block">{architectureLength}</span>
                </span>
              </span>
            </button>

            <button onClick={() => updateGenre('interiors')} className={`block text-lg leading-tight lg:text-xl tracking-tight xl:text-2xl relative md:leading-tight xl:leading-tight group hover:text-black ${ activeGenre == 'interiors' ? 'text-black' : 'text-gray' }`}>
              <div className="relative overflow-hidden">
                <span className="block">Interiors</span>
              </div>

              <span className="absolute top-0 right-0 text-[10px] leading-none translate-x-[15px] md:translate-x-[13px] translate-y-[2px]">
                <span className="block relative overflow-hidden tabular-nums">
                  <span className="block">{interiorsLength}</span>
                </span>
              </span>
            </button>
          </div>

          <div className="flex lg:hidden items-center justify-end space-x-3">
            <button onClick={() => updateActive('gallery')} className={`block lg:text-xl tracking-tight xl:text-2xl relative md:leading-tight xl:leading-tight overflow-hidden group ${ active == 'gallery' ? 'text-black' : 'text-gray text-opacity-80' }`}>
              <svg viewBox="0 0 16 12" className="w-[20px]" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M9 0h7v5H9zM0 0h7v12H0z"/></svg>
            </button>
            <button onClick={() => updateActive('archive')} className={`block lg:text-xl tracking-tight xl:text-2xl relative md:leading-tight xl:leading-tight overflow-hidden group ${ active == 'archive' ? 'text-black' : 'text-gray text-opacity-80' }`}>
              <svg viewBox="0 0 16 12" className="w-[20px]" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M0 0h7v2H0zM0 5h7v2H0zM0 10h7v2H0zM9 0h7v2H9zM9 5h7v2H9zM9 10h7v2H9z"/></svg>
            </button>
          </div>
          {/* END MOBILE FILTERS */}
          
          <AnimatePresence exitBeforeEnter>
            { active == 'gallery' && (
              <m.ul
                key="gallery"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.83, 0, 0.17, 1] }}
                className="mt-4 md:mt-6 grid grid-cols-10 gap-x-5 gap-y-3 md:gap-y-[8vw] items-end"
              >
                {works.map((e, i) => {
                  let layout = 'col-span-10 md:col-span-3'
                  let height = 'h-[60vw] md:h-[22vw]'
                  let disabledClass = 'hidden md:block grayscale opacity-30'
                  let preloadImage = false

                  // Preload the first two images...
                  if (i == 0 || i == 1) {
                    preloadImage = true
                  }

                  if (i == 0 || i == 12 || i == 24) {
                    layout = e.thumbnailImage.asset.metadata.dimensions.height > e.thumbnailImage.asset.metadata.dimensions.width ? 'col-span-7 md:col-span-4' : 'col-span-10 md:col-span-4'
                    height = e.thumbnailImage.asset.metadata.dimensions.height > e.thumbnailImage.asset.metadata.dimensions.width ? 'h-[90vw] md:h-[27vw]' : 'h-[60vw] md:h-[27vw]' 
                  }
                  if (i == 1 || i == 13 || i == 25) {
                    layout = e.thumbnailImage.asset.metadata.dimensions.height > e.thumbnailImage.asset.metadata.dimensions.width ? 'col-span-7 md:col-start-6 md:col-span-2' : 'col-span-10 md:col-start-6 md:col-span-2'
                    height = e.thumbnailImage.asset.metadata.dimensions.height > e.thumbnailImage.asset.metadata.dimensions.width ? 'h-[90vw] md:h-[13vw]' : 'h-[60vw] md:h-[13vw]'
                  }
                  if (i == 2 || i == 14 || i == 26) {
                    layout = e.thumbnailImage.asset.metadata.dimensions.height > e.thumbnailImage.asset.metadata.dimensions.width ? 'col-span-7 md:col-start-9 md:col-span-2' : 'col-span-10 md:col-start-9 md:col-span-2'
                    height = e.thumbnailImage.asset.metadata.dimensions.height > e.thumbnailImage.asset.metadata.dimensions.width ? 'h-[90vw] md:h-[19vw]' : 'h-[60vw] md:h-[19vw]'
                  }
                  if (i == 3 || i == 15 || i == 27) {
                    layout = e.thumbnailImage.asset.metadata.dimensions.height > e.thumbnailImage.asset.metadata.dimensions.width ? 'col-span-7 md:col-span-2' : 'col-span-10 md:col-span-2'
                    height = e.thumbnailImage.asset.metadata.dimensions.height > e.thumbnailImage.asset.metadata.dimensions.width ? 'h-[90vw] md:h-[19vw]' : 'h-[60vw] md:h-[19vw]'
                  }
                  if (i == 4 || i == 16 || i == 28) {
                    layout = e.thumbnailImage.asset.metadata.dimensions.height > e.thumbnailImage.asset.metadata.dimensions.width ? 'col-span-7 md:col-start-4 md:col-span-2' : 'col-span-10 md:col-start-4 md:col-span-2'
                    height = e.thumbnailImage.asset.metadata.dimensions.height > e.thumbnailImage.asset.metadata.dimensions.width ? 'h-[90vw] md:h-[13vw]' : 'h-[60vw] md:h-[13vw]'
                  }
                  if (i == 5 || i == 17 || i == 29) {
                    layout = e.thumbnailImage.asset.metadata.dimensions.height > e.thumbnailImage.asset.metadata.dimensions.width ? 'col-span-7 md:col-start-7 md:col-span-4' : 'col-span-10 md:col-start-7 md:col-span-4'
                    height = e.thumbnailImage.asset.metadata.dimensions.height > e.thumbnailImage.asset.metadata.dimensions.width ? 'h-[90vw] md:h-[27vw]' : 'h-[60vw] md:h-[27vw]'
                  }
                  if (i == 6 || i == 18 || i == 30) {
                    layout = e.thumbnailImage.asset.metadata.dimensions.height > e.thumbnailImage.asset.metadata.dimensions.width ? 'col-span-7 md:col-span-3' : 'col-span-10 md:col-span-3'
                    height = e.thumbnailImage.asset.metadata.dimensions.height > e.thumbnailImage.asset.metadata.dimensions.width ? 'h-[90vw] md:h-[19vw]' : 'h-[60vw] md:h-[19vw]'
                  }

                  if (i == 7 || i == 19 || i == 31) {
                    layout = e.thumbnailImage.asset.metadata.dimensions.height > e.thumbnailImage.asset.metadata.dimensions.width ? 'col-span-7 md:col-span-2 md:col-start-6' : 'col-span-10 md:col-span-2 md:col-start-6'
                    height = e.thumbnailImage.asset.metadata.dimensions.height > e.thumbnailImage.asset.metadata.dimensions.width ? 'h-[90vw] md:h-[18vw]' : 'h-[60vw] md:h-[18vw]'
                  }

                  if (i == 8 || i == 20 || i == 32) {
                    layout = e.thumbnailImage.asset.metadata.dimensions.height > e.thumbnailImage.asset.metadata.dimensions.width ? 'col-span-7 md:col-span-2 md:col-start-9' : 'col-span-10 md:col-span-2 md:col-start-9'
                    height = e.thumbnailImage.asset.metadata.dimensions.height > e.thumbnailImage.asset.metadata.dimensions.width ? 'h-[90vw] md:h-[13vw]' : 'h-[60vw] md:h-[13vw]'
                  }

                  if (i == 9 || i == 21 || i == 33) {
                    layout = e.thumbnailImage.asset.metadata.dimensions.height > e.thumbnailImage.asset.metadata.dimensions.width ? 'col-span-7 md:col-span-2' : 'col-span-10 md:col-span-2'
                    height = e.thumbnailImage.asset.metadata.dimensions.height > e.thumbnailImage.asset.metadata.dimensions.width ? 'h-[90vw] md:h-[24vw]' : 'h-[60vw] md:h-[24vw]'
                  }

                  if (i == 10 || i == 22 || i == 34) {
                    layout = e.thumbnailImage.asset.metadata.dimensions.height > e.thumbnailImage.asset.metadata.dimensions.width ? 'col-span-7 md:col-span-2 md:col-start-4' : 'col-span-10 md:col-span-2 md:col-start-4'
                    height = e.thumbnailImage.asset.metadata.dimensions.height > e.thumbnailImage.asset.metadata.dimensions.width ? 'h-[90vw] md:h-[18vw]' : 'h-[60vw] md:h-[18vw]'
                  }

                  if (i == 11 || i == 23 || i == 35) {
                    layout = e.thumbnailImage.asset.metadata.dimensions.height > e.thumbnailImage.asset.metadata.dimensions.width ? 'col-span-7 md:col-span-4 md:col-start-7' : 'col-span-10 md:col-span-4 md:col-start-7'
                    height = e.thumbnailImage.asset.metadata.dimensions.height > e.thumbnailImage.asset.metadata.dimensions.width ? 'h-[90vw] md:h-[27vw]' : 'h-[60vw] md:h-[27vw]'
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
                    <div className={`${layout} block mb-4 group md:mb-0 ${disabledClass}`} key={i}>
                      <Link href={`/works/${e.slug.current}`} key={i}>
                        <a
                          className={`block`}
                        >
                          {/* {JSON.stringify(e.thumbnailImage.asset.metadata.dimensions.height > e.thumbnailImage.asset.metadata.dimensions.width)} */}
                          <ReactCursorPosition>
                            <Teaser
                              height={height}
                              image={e.thumbnailImage}
                              preload={preloadImage}
                            />
                          </ReactCursorPosition>

                          <span className="block overflow-hidden relative">
                            <span className="block text-lg xl:text-xl leading-[1.1] xl:leading-[1.15] mb-[2px]">{e.title}</span>
                          </span>
                        </a>
                      </Link>
                      
                      <span className="block overflow-hidden relative">
                        <button 
                          onClick={() => updateTypeAndTray(e.sector)}
                          className="block text-lg xl:text-xl xl:leading-[1.2] leading-[1.2] mb-1 text-gray hover:text-black focus-visible:text-black capitalize outline-none border-none focus-visible:outline-none focus:border-none text-left"
                        >
                          <div className="relative">
                            <span className="block">{e.sector.replace(/-/g, ' ').replace('and', '&')}</span>

                            {/* <span className="block opacity-0 group-hover:opacity-100 absolute inset-0 text-left">
                              <Typewriter
                                options={{
                                  strings: [`${e.sector.replace(/-/g, ' ').replace('and', '&')}`, `${e.sector.replace(/-/g, ' ').replace('and', '&')}`, `${e.sector.replace(/-/g, ' ').replace('and', '&')}`, `${e.sector.replace(/-/g, ' ').replace('and', '&')}`, `${e.sector.replace(/-/g, ' ').replace('and', '&')}`],
                                  autoStart: true,
                                  delay: 100,
                                  loop: true,
                                }}
                              />
                            </span> */}
                          </div>
                        </button>
                      </span>
                    </div>
                  )
                })}
              </m.ul>
            )}
            { active == 'archive' && (
              <m.div
                key="archive"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.83, 0, 0.17, 1] }}
                className="grid grid-cols-10 gap-5 mt-6 md:mt-8 items-start"
              >
                <div className="col-span-2 col-start-0 md:sticky md:top-32 xl:top-40 hidden lg:block">
                  <div className={`w-full h-[12vw] relative overflow-hidden hidden md:block ${hovering ? 'opacity-100' : 'opacity-0' }`}>
                    {worksArchive.map((e, i) => {
                      return (
                        <Image
                          image={e.thumbnailImage}
                          focalPoint={e.thumbnailImage.hotspot}
                          layout="fill"
                          nonRelative
                          sizes="(max-width: 768px) 40vw,100vw"
                          className={`w-full inset-0 h-full object-cover object-center ${i == current ? 'opacity-100' : 'opacity-0' }`}
                        />
                      )
                    })}
                  </div>
                </div>

                <ul className={`lg:col-start-3 col-span-10 lg:col-span-8 w-full block archive-list ${(activeGenre !== 'all' || activeType !== 'all') && 'filter-on'}`} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
                  {worksArchive.map((e, i) => {
                    let archiveDisabledClass = 'grayscale opacity-30 filtered'
                    
                    if (activeType == 'all' && activeGenre == 'all') {
                      archiveDisabledClass = 'grayscale-0 opacity-100'
                    }
  
                    if (e.sector == activeType) {
                      archiveDisabledClass = 'grayscale-0 opacity-100 filtered-enabled'
                    }
  
                    if (e.expertise == activeGenre || e.expertise == 'architecture-and-interiors' && activeType == 'all') {
                      archiveDisabledClass = 'grayscale-0 opacity-100 filtered-enabled'
                    }

                    return !e.nonRoutedProjects ? (
                      <li className="block" key={i}>
                        <Link href={`/works/${e.slug.current}`}>
                          <a
                            className={`w-full border-b border-b-[#EFEFEF] flex flex-wrap items-start pt-[12px] pb-[7px] md:pt-[16px] md:pb-[11px] group relative archive-list__item ${archiveDisabledClass}`}
                            onMouseEnter={() => updateImage(i)}
                            onMouseLeave={() => updateImage(i)}
                          >
                            <span className={`absolute top-0 left-0 right-0 w-full h-[1px] bg-[#EFEFEF] ${ i == 0 ? 'mt-[0px]' : 'mt-[-1px]' }`}></span>
                            <span className="block w-[58px] md:w-20 lg:w-24 xl:w-32 uppercase text-[10px] md:text-xs leading-tight overflow-hidden relative pr-4 md:pr-12 xl:pr-20 self-center">
                              <span className="block tabular-nums mb-[7px] md:mb-[4px]">{e.projectCode}</span>
                            </span>

                            {!e.nonRoutedProjects && (
                              <span className="block flex-1 text-sm leading-tight md:text-base xl:text-lg md:leading-tight xl:leading-tight text-left overflow-hidden pr-3 pt-[2px] md:pt-[1px] absolute left-0 pl-[35px] md:pl-[50px] lg:pl-[57px] xl:pl-[70px]">
                                <span className="block">+</span>
                              </span>
                            )}
                            
                            <span className="block flex-1 md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-left overflow-hidden relative pr-3">
                              <span className="inline-block overflow-hidden relative">
                                <span className="block">{e.title}</span>
                                
                                <span className="archive-list__item--underline w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
                              </span>
                            </span>
                            <span className="flex-1 md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-left hidden md:block relative overflow-hidden pr-3">
                              <span className="block capitalize">{e.expertise.replace(/-/g, ' ').replace('and', '&')}</span>
                              </span>
                            <span className="block w-[25px] md:flex-1 md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-left relative overflow-hidden pr-3">
                              <span className="block">
                                <span className="hidden lg:block">{e.locationCity}{e.locationState && (<>, {e.locationState}</>)}</span>

                                <span className="block lg:hidden">{e.locationState && (<>{e.locationState}</>)}</span>
                              </span>
                            </span>
                            <span className="hidden md:block w-[140px] md:w-[150px] xl:w-[160px] md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-right relative overflow-hidden">
                              <span className="block">{e.year}</span>
                            </span>
                          </a>
                        </Link>
                      </li>
                    ) : (
                      <li className="block" key={i}>
                        <div
                          className={`w-full border-b border-b-[#EFEFEF] flex flex-wrap items-start py-3 md:py-4 cursor-default group relative archive-list__item ${archiveDisabledClass}`}
                          onMouseEnter={() => updateImage(i)}
                          onMouseLeave={() => updateImage(i)}
                        >
                          <span className={`absolute top-0 left-0 right-0 w-full h-[1px] bg-[#EFEFEF] ${ i == 0 ? 'mt-[0px]' : 'mt-[-1px]' }`}></span>
                          <span className="block w-[58px] md:w-20 lg:w-24 xl:w-32 uppercase text-[10px] md:text-xs leading-tight overflow-hidden relative pr-4 md:pr-12 xl:pr-20 self-center">
                            <span className="block tabular-nums">{e.projectCode}</span>
                          </span>

                          {!e.nonRoutedProjects && (
                            <span className="block flex-1 text-sm leading-tight md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-left overflow-hidden pr-3 pt-[2px] md:pt-0 absolute left-0 pl-[35px] md:pl-[50px] lg:pl-[57px] xl:pl-[70px]">
                              <span className="block">+</span>
                            </span>
                          )}
                          
                          <span className="block flex-1 md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-left overflow-hidden relative pr-3">
                            <span className="block">{e.title}</span>
                          </span>
                          <span className="flex-1 md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-left hidden md:block relative overflow-hidden pr-3">
                            <span className="block capitalize">{e.expertise.replace(/-/g, ' ').replace('and', '&')}</span>
                            </span>
                          <span className="block w-[25px] md:flex-1 md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-left relative overflow-hidden pr-3">
                            <span className="block">
                              <span className="hidden lg:block">{e.locationCity}{e.locationState && (<>, {e.locationState}</>)}</span>

                              <span className="block lg:hidden">{e.locationState && (<>{e.locationState}</>)}</span>
                            </span>
                          </span>
                          <span className="hidden md:block w-[140px] md:w-[150px] xl:w-[160px] md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-right relative overflow-hidden">
                            <span className="block">{e.year}</span>
                          </span>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </m.div>
            )}
            </AnimatePresence>
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