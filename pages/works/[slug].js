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
import { useState } from 'react'

const query = `*[_type == "works" && slug.current == $slug][0]{
  title,
  introText,
  locationCity,
  locationState,
  client,
  year,
  status,
  sector,
  contentBlocks[] {
    ...,
    image {
      asset-> {
        ...
      },
      alt,
      caption,
      captionSubHeading
    },
    image1 {
      asset-> {
        ...
      },
      alt,
      caption,
      captionSubHeading
    },
    image2 {
      asset-> {
        ...
      },
      alt,
      caption,
      captionSubHeading
    },
    images[] {
      asset-> {
        ...
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
}`

const pageService = new SanityPageService(query)

export default function WorksSlug(initialData) {
  const { data: { title, introText, locationCity, locationState, heroImages, client, year, status, sector, contentBlocks, slug } } = pageService.getPreviewHook(initialData)()

  const [currentHero, setCurrentHero] = useState(0);

  return (
    <Layout>
      <NextSeo title={title} />

      <Header active="works" />
      
      <LazyMotion features={domAnimation}>
        <m.main
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <m.article>
            <div className="md:h-[calc(100vh-16px)] flex flex-wrap items-end pt-20 mb-20 md:mb-32 xl:mb-52">
              <div className="w-full md:w-[20vw] mb-3 md:mb-0">
                <span className="block text-[10px] uppercase mb-8">ww.018</span>
                <h1 className="block lg:text-xl xl:text-2xl relative md:leading-tight xl:leading-tight mb-0 pb-0">{title}</h1>
                <span className="block lg:text-xl xl:text-2xl relative md:leading-tight xl:leading-tight mb-0 pb-0 text-gray">{locationCity}{locationState && (<>, {locationState}</>)}</span>
              </div>
              <div className="w-full md:flex-1">
                <div className="flex flex-wrap w-full">
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
                  <div className="w-full md:flex-1 order-1 md:order-2">
                    <div className="bg-gray bg-opacity-40 w-full h-[60vh] md:h-[75vh] relative overflow-hidden">
                      <Image
                        image={heroImages[currentHero]}
                        focalPoint={heroImages[currentHero].asset.hotspot}
                        layout="fill"
                        priority
                        widthOverride={1400}
                        className="w-full h-full absolute inset-0 object-cover object-center"
                        noCaption
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-10 gap-5 mb-20 md:mb-32 xl:mb-52">
              <div className="col-span-9 md:col-span-3 mb-8 md:mb-0">
                { client && (
                  <div className="mb-3">
                    <span className="uppercase text-[10px]">Client</span>
                    <span className="block">{client}</span>
                  </div>
                )}
                { year && (
                  <div className="mb-3">
                    <span className="uppercase text-[10px]">Year</span>
                    <span className="block">{year}</span>
                  </div>
                )}
                { status && (
                  <div className="mb-3">
                    <span className="uppercase text-[10px]">Status</span>
                    <span className="block">{status}</span>
                  </div>
                )}
                { sector && (
                  <div className="mb-3">
                    <span className="uppercase text-[10px]">Sector</span>
                    <span className="block capitalize">{sector.replace(/-/g, ' ')}</span>
                  </div>
                )}
              </div>

              <div className="md:col-start-5 col-span-9 md:col-span-4">
                <span className="block indent-[12%] md:indent-[26%] text-[5.55vw] md:text-[3.3vw] xl:text-[2.5vw] leading-[1.1] md:leading-[1.1] xl:leading-[1.1] max-w-[80vw] mt-4 md:mt-6">{introText}</span>
              </div>
            </div>

            <BodyRenderer body={contentBlocks} />
          </m.article>
        </m.main>
      </LazyMotion>

      <Footer />
    </Layout>
  )
}

export async function getStaticProps(context) {
  const props = await pageService.fetchQuery(context)
  return {
    props
  };
}

export async function getStaticPaths() {
  const paths = await pageService.fetchPaths('works')
  return {
    paths: paths,
    fallback: false,
  };
}