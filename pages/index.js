import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import SanityPageService from '@/services/sanityPageService'
import Image from '@/components/image'
import Link from 'next/link'
import ReactCursorPosition from 'react-cursor-position'
import Teaser from '@/components/teaser'
import { useContext, useEffect, useState } from 'react'
import { IntroContext } from '@/context/intro'
import HomeHeroHover from '@/components/home-hero-hover'

const query = `{
  "home": *[_type == "home"][0]{
    title,
    worksImage {
      asset-> {
        ...,
      },
      overrideVideo {
        asset-> {
          ...
        }
      },
      overrideVimeoVideo,
      caption,
      captionSubHeading,
      alt,
      hotspot {
        x,
        y
      }
    },
    journalImage {
      asset-> {
        ...,
      },
      overrideVideo {
        asset-> {
          ...
        }
      },
      overrideVimeoVideo,
      caption,
      captionSubHeading,
      alt,
      hotspot {
        x,
        y
      }
    },
    studioImage {
      asset-> {
        ...,
      },
      overrideVideo {
        asset-> {
          ...
        }
      },
      overrideVimeoVideo,
      caption,
      captionSubHeading,
      alt,
      hotspot {
        x,
        y
      }
    },
    heroFeaturedWorks[] -> {
      title,
      projectCode,
      locationCity,
      locationState,
      year,
      heroImages[] {
        asset-> {
          ...,
        },
        overrideVideo {
          asset-> {
            ...
          }
        },
        overrideVimeoVideo,
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
    },
    seo {
      ...,
      shareGraphic {
        asset->
      }
    }
  },
  "works": *[_type == "works"]{
    title
  },
  "globals": *[_type == "globals"][0]{
    footerTickerItems[]
  }
}`

const pageService = new SanityPageService(query)

export default function Home(initialData) {
  const { data: { home, works, globals } } = pageService.getPreviewHook(initialData)()
  const [introContext, setIntroContext] = useContext(IntroContext);
  const [current, setCurrent] = useState(0);
  
  const imageScale = {
    visible: { scale: 1 },
    hidden: { scale: 1.125 }
  }

  const revealTranslate = {
    visible: { y: 0 },
    hidden: { y: '105%' }
  }

  useEffect(() => {
    setTimeout(() => {
      setIntroContext(true)
    }, 3150);
  },[]);

  const updateHero = (e) => {
    setCurrent(e)
  }

  return (
    <Layout>
      <NextSeo title={home.title} />
      <Header active="home" works={works.length} />
      
      <LazyMotion features={domAnimation}>
        <m.div
          variants={fade}
          initial="initial"
          animate="enter"
          exit="exit"
          className="-m-2"
        >
          <HomeHeroHover items={home.heroFeaturedWorks}></HomeHeroHover>
          
          <div className="bg-white relative z-[10] p-2 pt-12 md:pt-16 xl:pt-24 safari-sticky">
            <div className="grid grid-cols-10 gap-3 md:gap-5 bg-white">
              <div className="col-span-10 md:col-span-8 xl:col-span-7">
                <h1 className="block indent-[25.35%] xl:indent-[28.95%] text-[9vw] md:text-[7.25vw] xl:text-[5.85vw] leading-[0.95] md:leading-[0.95] xl:leading-[0.95] max-w-[80vw] mb-12 md:mb-20 xl:mb-32">We are an architecture &amp; design studio that creates experience driven buildings and interiors.</h1>
              </div>
            </div>

            <div className="grid grid-cols-10 gap-3 md:gap-5 mb-5">
              <div className="col-span-10 md:col-span-5">
                <Link href={`/works`}>
                  <a
                    className={`block group mb-4 md:mb-0`}
                  >
                    <div className={`mb-3 relative overflow-hidden h-[60vw] md:h-[33vw] cursor-crosshair`}>
                      <Image
                        image={home.worksImage}
                        focalPoint={home.worksImage.hotspot}
                        layout="fill"
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className={`w-full inset-0 h-full object-cover object-center`}
                      />
                      
                      <div className="bg-black bg-opacity-40 flex items-center justify-center absolute inset-0 z-[10001] opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity ease-in-out duration-[250ms]">
                      </div>
                    </div>

                    {/* <div>
                      <span className="inline-block overflow-hidden relative text-lg leading-none xl:leading-[1.15] xl:text-xl w-10/12">Experience duality at the monolithic Roadside Hotel in Palm Springs.</span>
                    </div> */}

                    <span className="inline-block overflow-hidden relative text-lg leading-none xl:leading-[1.2] xl:text-xl">
                      <span className="inline-block">Explore Works</span>
                      <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
                    </span>
                  </a>
                </Link>
              </div>

              <div className="col-span-10 md:col-span-5">
                <Link href={`/journal`}>
                  <a
                    className={`block group mb-4 md:mb-0`}
                  >
                    <div className={`mb-3 relative overflow-hidden h-[60vw] md:h-[33vw] cursor-crosshair`}>
                      <Image
                        image={home.journalImage}
                        focalPoint={home.journalImage.hotspot}
                        layout="fill"
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className={`w-full inset-0 h-full object-cover object-center`}
                      />
                      
                      <div className="bg-black bg-opacity-40 flex items-center justify-center absolute inset-0 z-[10001] opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity ease-in-out duration-[250ms]">
                      </div>
                    </div>

                    {/* <div>
                      <span className="inline-block overflow-hidden relative text-lg leading-none xl:leading-[1.15] xl:text-xl w-10/12">We are all about vision, strategy, adaptability, communication, and quality.</span>
                    </div> */}
                    
                    <span className="inline-block overflow-hidden relative text-lg leading-none xl:leading-[1.2] xl:text-xl">
                      <span className="inline-block">Read Journal</span>
                      <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
                    </span>
                  </a>
                </Link>
              </div>

              <div className="col-span-10 md:mt-5">
                <Link href={`/studio`}>
                  <a
                    className={`block group mb-4 md:mb-0`}
                  >
                    <div className={`mb-3 relative overflow-hidden h-[60vw] cursor-crosshair`}>
                      <Image
                        image={home.studioImage}
                        focalPoint={home.studioImage.hotspot}
                        layout="fill"
                        sizes="(min-width: 768px) 99vw, 100vw"
                        className={`w-full inset-0 h-full object-cover object-center`}
                      />
                      
                      <div className="bg-black bg-opacity-40 flex items-center justify-center absolute inset-0 z-[10001] opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity ease-in-out duration-[250ms]">
                      </div>
                    </div>

                    {/* <span className="inline-block overflow-hidden relative text-lg leading-none xl:leading-[1.15] xl:text-xl w-10/12">
                      <span className="inline-block ">{home.featuredJournalEntry.title}</span>
                    </span> */}

                    <div className="block">
                      <span className="inline-block overflow-hidden text-lg leading-none xl:leading-[1.2] xl:text-xl relative">
                        <span className="block">Explore Studio</span>
                        <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
                      </span>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </m.div>

        <Footer footerTickerItems={globals.footerTickerItems} />
      </LazyMotion>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const cms = await pageService.fetchQuery(context)

  return {
    props: { ...cms }
  }
}