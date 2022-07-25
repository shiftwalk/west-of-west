import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import SanityPageService from '@/services/sanityPageService'
import BodyRenderer from '@/components/body-renderer'
import Link from 'next/link'
import BlockContent from '@sanity/block-content-to-react'
import Image from '@/components/image'
import { useContext, useEffect, useState } from 'react'
import ReactCursorPosition from 'react-cursor-position'
import Teaser from '@/components/teaser'
import { IntroContext } from 'context/intro'

const query = `*[_type == "works" && slug.current == $slug][0]{
  title,
  introText,
  locationCity,
  locationState,
  client,
  year,
  superWideHero,
  status,
  sector,
  projectCode,
  credits[] {
    job,
    name
  },
  contentBlocks[] {
    ...,
    image {
      asset-> {
        ...
      },
      overrideVideo {
        asset-> {
          ...
        }
      },
      alt,
      caption,
      captionSubHeading
    },
    afterImage {
      asset-> {
        ...
      },
      overrideVideo {
        asset-> {
          ...
        }
      },
      alt,
      caption,
      captionSubHeading
    },
    beforeImage {
      asset-> {
        ...
      },
      overrideVideo {
        asset-> {
          ...
        }
      },
      alt,
      caption,
      captionSubHeading
    },
    image1 {
      asset-> {
        ...
      },
      overrideVideo {
        asset-> {
          ...
        }
      },
      alt,
      caption,
      captionSubHeading
    },
    image2 {
      asset-> {
        ...
      },
      overrideVideo {
        asset-> {
          ...
        }
      },
      alt,
      caption,
      captionSubHeading
    },
    images[] {
      asset-> {
        ...
      },
      overrideVideo {
        asset-> {
          ...
        }
      },
      alt,
      caption,
      captionSubHeading
    },
    items[] {
      ...,
      image {
        asset-> {
          ...
        },
        overrideVideo {
          asset-> {
            ...
          }
        },
        alt,
        caption,
        captionSubHeading
      },
    }
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
    captionSubHeading,
    alt,
    hotspot {
      x,
      y
    },
  },
  slug {
    current
  },
  "worksAll": *[_type == "works"]{
    title
  },
  "related": *[_type == "works" && order > ^.order && sector == ^.sector && slug.current != $slug && gridProject] | order(order asc)[0..2] {
    title,
    gridProject,
    sector,
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
    date,
    slug {
      current
    }
  },
  "relatedFirst": *[_type == "works" && sector == ^.sector && slug.current != $slug] | order(order asc)[0..2] {
    title,
    sector,
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
    date,
    slug {
      current
    }
  },
  "globals": *[_type == "globals"][0]{
    footerTickerItems[]
  }
}`

const pageService = new SanityPageService(query)

export default function WorksSlug(initialData) {
  const { data: { title, introText, projectCode, credits, locationCity, locationState, heroImages, client, year, status, sector, contentBlocks, slug, superWideHero, worksAll, related, relatedFirst, globals } } = pageService.getPreviewHook(initialData)()
  const [currentHero, setCurrentHero] = useState(0);
  const [introContext, setIntroContext] = useContext(IntroContext);
  
  useEffect(() => {
    setIntroContext(true)
  },[]);

  return (
    <Layout>
      <NextSeo title={title} />

      <Header active="works" works={worksAll.length} />
      
      <LazyMotion features={domAnimation}>
        <m.main
          variants={fade}
          initial="initial"
          animate="enter"
          exit="exit"
          className="md:-m-2"
        >
          <m.article>
            <div className="md:h-screen grid grid-cols-10 gap-x-5 items-end pt-20 md:sticky top-0 z-0 md:p-2">
              <div className="col-span-10 md:col-span-2 mb-3 md:mb-0">
                <span className="block text-lg md:text-[12px] uppercase mb-2 md:mb-8">{projectCode}</span>
                <h1 className="block text-lg leading-tight lg:text-xl xl:text-2xl relative md:leading-tight xl:leading-tight mb-0 pb-0">{title}</h1>
                <span className="block text-lg lg:text-xl xl:text-2xl relative leading-tight md:leading-tight xl:leading-tight mb-0 pb-0 text-gray">{locationCity}{locationState && (<>, {locationState}</>)}</span>
              </div>
              <div className="col-span-10 md:col-span-8 -mx-2 md:mx-0">
                <div className="flex flex-wrap w-full">
                  {heroImages.length > 1 && (
                    <div className="w-full md:w-[75px] order-2 md:order-1 md:mr-4">
                      <div className="flex flex-wrap md:block -mx-1 md:mx-0">
                        {heroImages.map((e, i) => {
                          return (
                            <button key={i} className={`w-1/4 md:w-[100%] px-1 md:px-0 md:mr-5 mt-2 md:mt-0 md:mb-5 border-none outline-none block h-[14vw] ${ i == 2 ? 'md:h-[90px]' : 'md:h-[50px]' }`} onClick={() => setCurrentHero(i)}>
                              <div className="relative overflow-hidden w-full h-full">
                                <Image
                                  image={e}
                                  focalPoint={e.asset.hotspot}
                                  layout="fill"
                                  priority
                                  widthOverride={350}
                                  className={`block gray absolute inset-0 h-full w-full ${currentHero !== i && 'grayscale opacity-40' }`}
                                  noCaption
                                />
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                  <div className="w-full md:flex-1 order-1 md:order-2">
                    <div className={`bg-gray bg-opacity-40 w-full relative overflow-hidden  ${superWideHero ? 'h-[60vw] md:h-[55vh]' : 'h-[70vw] md:h-[75vh]' }`}>
                      <Image
                        image={heroImages[currentHero]}
                        focalPoint={heroImages[currentHero].asset.hotspot}
                        layout="fill"
                        priority
                        sizes="(min-width: 768px) 75vw, 100vw"
                        className="w-full h-full absolute inset-0 object-cover object-center"
                        noCaption
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-10 gap-5 pb-12 md:pb-32 xl:pb-52 pt-3 md:pt-32 xl:pt-52 bg-white relative z-[20] safari-sticky md:p-2 safari-sticky">
              <div className="md:col-start-0 col-span-9 md:col-span-10 mt-8 md:mt-0 mb-5 md:mb-12 xl:mb-20">
                <div className="content content--fancy-no-indent">
                  <BlockContent serializers={{ container: ({ children }) => children }} blocks={introText} />
                </div>
              </div>

              <div className="md:col-start-3 col-span-10 md:col-span-7 mt-0 md:mt-0">
                { client && (
                  <div className="mb-3 md:mb-2 grid grid-cols-10 max-w-[850px] gap-x-5">
                    <span className="text-lg leading-tight xl:text-xl xl:leading-[1.15] text-gray col-span-10 md:col-span-3">Client</span>
                    <span className="block text-lg leading-tight xl:text-xl xl:leading-[1.15] md:col-start-4 col-span-10 md:col-span-4">{client}</span>
                  </div>
                )}
                { year && (
                  <div className="mb-3 md:mb-2 grid grid-cols-10 max-w-[850px] gap-x-5">
                    <span className="text-lg leading-tight xl:text-xl xl:leading-[1.15] text-gray col-span-10 md:col-span-3">Year</span>
                    <span className="block text-lg leading-tight xl:text-xl xl:leading-[1.15] md:col-start-4 col-span-10 md:col-span-4">{year}</span>
                  </div>
                )}
                { status && (
                  <div className="mb-3 md:mb-2 grid grid-cols-10 max-w-[850px] gap-x-5">
                    <span className="text-lg leading-tight xl:text-xl xl:leading-[1.15] text-gray col-span-10 md:col-span-3">Status</span>
                    <span className="block text-lg leading-tight xl:text-xl xl:leading-[1.15] md:col-start-4 col-span-10 md:col-span-4">{status}</span>
                  </div>
                )}
                { sector && (
                  <div className="mb-3 md:mb-2 grid grid-cols-10 max-w-[850px] gap-x-5">
                    <span className="text-lg leading-tight xl:text-xl xl:leading-[1.15] text-gray col-span-10 md:col-span-3">Sector</span>
                    <span className="block text-lg leading-tight xl:text-xl xl:leading-[1.15] md:col-start-4 col-span-10 md:col-span-4 capitalize">{sector.replace(/-/g, ' ')}</span>
                  </div>
                )}
                {credits && (
                  <>
                    {credits.map((e, i) => {
                      return (
                        <div className="mb-3 md:mb-2 grid grid-cols-10 max-w-[850px] gap-x-5">
                          <span className="text-lg leading-tight xl:text-xl xl:leading-[1.15] text-gray col-span-10 md:col-span-3">{e.job}</span>
                          <span className="block text-lg leading-tight xl:text-xl xl:leading-[1.15] md:col-start-4 col-span-10 md:col-span-4 capitalize">{e.name}</span>
                        </div>
                      )
                    })}
                  </>
                )}
              </div>
            </div>
            
            <div className="bg-white relative z-[20] safari-sticky md:p-2">
              <BodyRenderer body={contentBlocks} />
            </div>
          </m.article>
        </m.main>

        <m.div className="pt-20 md:pt-32 xl:pt-40 bg-white relative z-[20] safari-sticky">
          <div className="mb-3">
            <span className="inline-block text-lg leading-tight  xl:text-xl relative xl:leading-tight">More in <span className="capitalize">{sector.replace(/-/g, ' ')}</span></span>
            <Link href="/works">
              <a className="block text-lg leading-tight  xl:text-xl relative xl:leading-tight text-gray hover:text-black focus:text-black">See All</a>
            </Link>
          </div>
          
          { related.length > 2 ? (
            <div className="grid grid-cols-10 gap-2 md:gap-5">
              {related.map((e, i) => {
                let layout = 'md:col-start-0'
                let height = 'h-[60vw] md:h-[18vw]'
                // let disabledClass = 'grayscale opacity-30'

                if (i == 0) {
                  layout = 'md:col-start-1'
                }
                if (i == 1) {
                  layout = 'md:col-start-4'
                }
                if (i == 2) {
                  layout = 'md:col-start-8'
                }

                return (
                  <div className={`${layout} col-span-10 md:col-span-3 block group mb-6 md:mb-0`} key={i}>
                    <Link href={`/works/${e.slug.current}`}>
                      <a
                        className={`block w-full group`}
                      >
                        <ReactCursorPosition>
                          <Teaser
                            height={height}
                            image={e.thumbnailImage}
                          />
                        </ReactCursorPosition>

                        <span className="block overflow-hidden relative">
                          <span className="block text-lg leading-none xl:text-xl xl:leading-[1] mb-1 mt-[-3px] md:mt-0">{e.title}</span>
                        </span>
                      </a>
                    </Link>
                    
                    <span className="block overflow-hidden relative">
                      <span
                        className="block text-lg leading-none xl:text-xl xl:leading-[1] mb-1 text-gray capitalize"
                      >
                        {e.sector.replace(/-/g, ' ').replace('and', '&')}
                      </span>
                    </span>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="grid grid-cols-10 gap-2 md:gap-5">
              {relatedFirst.map((e, i) => {
                let layout = 'md:col-start-0'
                let height = 'h-[60vw] md:h-[18vw]'
                // let disabledClass = 'grayscale opacity-30'

                if (i == 0) {
                  layout = 'md:col-start-1'
                }
                if (i == 1) {
                  layout = 'md:col-start-4'
                }
                if (i == 2) {
                  layout = 'md:col-start-8'
                }

                return (
                  <div className={`${layout} col-span-10 md:col-span-3 block group mb-4 md:mb-0`} key={i}>
                    <Link href={`/works/${e.slug.current}`}>
                      <a
                        className={`block w-full group`}
                      >
                        <ReactCursorPosition>
                          <Teaser
                            height={height}
                            image={e.thumbnailImage}
                          />
                        </ReactCursorPosition>

                        <span className="block overflow-hidden relative">
                          <span className="block text-lg leading-none mb-1">{e.title}</span>
                        </span>
                      </a>
                    </Link>
                    
                    <span className="block overflow-hidden relative">
                      <span
                        className="block text-lg leading-none mb-1 text-gray capitalize"
                      >
                        {e.sector.replace(/-/g, ' ').replace('and', '&')}
                      </span>
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </m.div>
      </LazyMotion>

      <Footer footerTickerItems={globals.footerTickerItems}/>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const props = await pageService.fetchQuery(context)
  return {
    props,
  };
}

export async function getStaticPaths() {
  const paths = await pageService.fetchPaths('works')
  return {
    paths: paths,
    fallback: false,
  };
}