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
    featuredJournalEntry -> {
      title,
      heroImage {
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
  }
}`

const pageService = new SanityPageService(query)

export default function Home(initialData) {
  const { data: { home, works } } = pageService.getPreviewHook(initialData)()
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
          
          <div className="bg-white relative z-[10] p-2 pt-12 md:pt-16 xl:pt-24">
            <div className="grid grid-cols-10 gap-3 md:gap-5 bg-white">
              <div className="col-span-10 md:col-span-8 xl:col-span-7">
                <h1 className="block indent-[25.35%] xl:indent-[28.95%] text-[9vw] md:text-[7.25vw] xl:text-[5.85vw] leading-[0.95] md:leading-[0.95] xl:leading-[0.95] max-w-[80vw] mb-12 md:mb-20 xl:mb-32">We are an architecture &amp; design studio that creates experience driven buildings and interiors.</h1>
              </div>
            </div>

            <div className="grid grid-cols-10 gap-3 md:gap-5 mb-5">
              <div className="col-span-10 md:col-span-3">
                <Link href={`/works`}>
                  <a
                    className={`block group mb-4 md:mb-0`}
                  >
                  <ReactCursorPosition>
                      <Teaser
                        height={'h-[60vw] md:h-[25vw]'}
                        image={home.worksImage}
                      />
                    </ReactCursorPosition>

                    <span className="inline-block overflow-hidden relative text-lg md:text-xl xl:text-2xl">
                      <span className="inline-block">Explore Works</span>
                      <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
                    </span>
                  </a>
                </Link>
              </div>

              <div className="md:col-start-7 col-span-10 md:col-span-4 md:mt-32 xl:mt-48 md:text-right">
                <Link href={`/studio`}>
                  <a
                    className={`block group mb-4 md:mb-0`}
                  >
                  <ReactCursorPosition>
                      <Teaser
                        height={'h-[60vw] md:h-[41vw]'}
                        image={home.studioImage}
                      />
                    </ReactCursorPosition>

                    <span className="inline-block overflow-hidden relative text-lg md:text-xl xl:text-2xl">
                      <span className="inline-block">See Studio</span>
                      <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
                    </span>
                  </a>
                </Link>
              </div>

              <div className="col-span-10 md:col-start-3 md:col-span-3 md:-mt-32 xl:-mt-48">
                <Link href={`/journal/${home.featuredJournalEntry.slug.current}`}>
                  <a
                    className={`block group mb-4 md:mb-0`}
                  >
                  <ReactCursorPosition>
                      <Teaser
                        height={'h-[60vw] md:h-[19vw]'}
                        image={home.featuredJournalEntry.heroImage}
                      />
                    </ReactCursorPosition>

                    <span className="inline-block overflow-hidden relative text-lg md:text-xl xl:text-2xl">
                      <span className="inline-block ">{home.featuredJournalEntry.title}</span>
                      {/* <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span> */}
                    </span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </m.div>

        <Footer />
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