import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import SanityPageService from '@/services/sanityPageService'
import Link from 'next/link'
import ReactCursorPosition from 'react-cursor-position'
import Teaser from '@/components/teaser'
import { IntroContext } from 'context/intro'
import { useContext, useEffect } from 'react'
import ConditionalWrap from 'conditional-wrap'
import Image from '@/components/image'

const query = `{
  "journal": *[_type == "journal"] | order(date desc){
    title,
    routedArticle,
    externalLinks[] {
      linkTitle,
      linkUrl
    },
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
      }
    },
    date,
    slug {
      current
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

export default function Journal(initialData) {
  const { data: { journal, works } } = pageService.getPreviewHook(initialData)()
  const [introContext, setIntroContext] = useContext(IntroContext);
  
  useEffect(() => {
    setIntroContext(true)
  },[]);

  return (
    <Layout>
      <NextSeo title="Journal" />

      <Header active="journal" works={works.length} />
      
      <LazyMotion features={domAnimation}>
        <m.main
          variants={fade}
          initial="initial"
          animate="enter"
          exit="exit"
          className="pt-24 md:pt-32 xl:pt-40"
        >
          <m.article>
            <ul className="mt-4 md:mt-6 grid grid-cols-10 gap-x-5 gap-y-[10vw] items-start">
              {journal.map((e, i) => {
                let d = new Date(e.date);
                let ye = new Intl.DateTimeFormat('en', { year: '2-digit' }).format(d);
                let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
                let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

                let layout = 'md:col-start-0'
                let height = 'h-[60vw] md:h-[13vw]'
                // let disabledClass = 'grayscale opacity-30'
                let preloadImage = false

                // Preload the first two images...
                if (i == 0 || i == 1) {
                  preloadImage = true
                }
                
                if (i == 0 || i == 8  || i == 17 || i == 26 || i == 35  || i == 44 || i == 53) {
                  layout = 'md:col-start-1'
                }
                if (i == 1 || i == 9  || i == 18 || i == 27 || i == 36 || i == 45 || i == 54) {
                  layout = 'md:col-start-6'
                }
                if (i == 2 || i == 10  || i == 19 || i == 28 || i == 37 || i == 46 || i == 55) {
                  layout = 'md:col-start-9'
                }
                if (i == 3 || i == 11  || i == 20 || i == 29 || i == 38 || i == 47 || i == 56) {
                  layout = 'md:col-start-2'
                }
                if (i == 4 || i == 12  || i == 21 || i == 30 || i == 39 || i == 48 || i == 57) {
                  layout = 'md:col-start-4'
                }
                if (i == 5 || i == 13  || i == 22 || i == 31 || i == 40 || i == 49 || i == 58) {
                  layout = 'md:col-start-9'
                }
                if (i == 6 || i == 14 || i == 23 || i == 32 || i == 41 || i == 50 || i == 59) {
                  layout = 'md:col-start-0'
                }
                if (i == 7 || i == 15 || i == 24 || i == 33 || i == 42 || i == 51 || i == 60) {
                  layout = 'md:col-start-7'
                }

                return (
                  <div className={`${layout} col-span-10 md:col-span-2 block group mb-4 md:mb-0`}>
                    {e.routedArticle && (
                      <Link href={`/journal/${e.slug.current}`} key={i}>
                        <a className={`w-full block`}>
                          <div className="w-full">
                            { e.routedArticle ? (
                              <ReactCursorPosition>
                                <Teaser
                                  height={height}
                                  image={e.heroImage}
                                  preload={preloadImage}
                                />
                              </ReactCursorPosition>
                            ) : (
                              <div className={`mb-3 relative overflow-hidden ${height}`}>
                                <Image
                                  image={e.heroImage}
                                  focalPoint={e.heroImage.hotspot}
                                  layout="fill"
                                  widthOverride={1000}
                                  className={`w-full inset-0 h-full object-cover object-center`}
                                />

                              </div>
                            )}
                            <span className="block overflow-hidden relative">
                              <span className="block text-lg xl:text-xl leading-none xl:leading-[1.15] mb-2 md:mb-2 text-gray uppercase">{mo}.{da}.{ye}</span>
                            </span>

                            <span className="block overflow-hidden relative">
                              <span className="block text-lg xl:text-xl leading-none xl:leading-[1.15] mb-1">{e.title}</span>
                            </span>

                            { e.routedArticle && (
                              <span className="inline-block overflow-hidden text-lg leading-none xl:text-xl xl:leading-[1.15] relative mt-2">
                                <span className="block">Read More</span>
                                <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
                              </span>
                            )}
                          </div>
                        </a>
                      </Link>
                    )}
                    { e.externalLinks && !e.routedArticle && (
                      <a className={`w-full block`} href={e.externalLinks[0].linkUrl} target="_blank" rel="noreferrer noopener">
                        <div className="w-full">
                          <ReactCursorPosition>
                            <Teaser
                              external
                              height={height}
                              image={e.heroImage}
                            />
                          </ReactCursorPosition>
                          <span className="block overflow-hidden relative">
                            <span className="block text-lg xl:text-xl leading-none xl:leading-[1.15] mb-2 md:mb-2 text-gray uppercase">{mo}.{da}.{ye}</span>
                          </span>

                          <span className="block overflow-hidden relative">
                            <span className="block text-lg xl:text-xl leading-none xl:leading-[1.15] mb-1">{e.title}</span>
                          </span>

                          <span className="inline-block overflow-hidden text-lg leading-none xl:text-xl xl:leading-[1.15] relative mt-2">
                            <span className="block">External Article</span>
                            <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
                          </span>
                        </div>
                      </a>
                    )}
                    { !e.externalLinks && !e.routedArticle && (
                      <div className="w-full">
                        <div className={`mb-3 relative overflow-hidden ${height}`}>
                          <Image
                            image={e.heroImage}
                            focalPoint={e.heroImage.hotspot}
                            layout="fill"
                            widthOverride={1000}
                            className={`w-full inset-0 h-full object-cover object-center`}
                          />

                        </div>
                        <span className="block overflow-hidden relative">
                          <span className="block text-lg xl:text-xl leading-none xl:leading-[1.15] mb-2 md:mb-2 text-gray uppercase">{mo}.{da}.{ye}</span>
                        </span>

                        <span className="block overflow-hidden relative">
                          <span className="block text-lg xl:text-xl leading-none xl:leading-[1.15] mb-1">{e.title}</span>
                        </span>
                      </div>
                    )}
                  </div>
                )
              })}
            </ul>
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