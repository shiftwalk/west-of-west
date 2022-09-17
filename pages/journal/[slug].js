import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import SanityPageService from '@/services/sanityPageService'
import Link from 'next/link'
import Image from '@/components/image'
import SanityBlockContent from '@sanity/block-content-to-react'
import ReactCursorPosition from 'react-cursor-position'
import Teaser from '@/components/teaser'
import { IntroContext } from 'context/intro'
import { useContext, useEffect } from 'react'

const query = `*[_type == "journal" && slug.current == $slug][0]{
  title,
  contentText,
  date,
  heroImage {
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
  contentImages[] {
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
    alt,
    hotspot {
      x,
      y
    },
  },
  projectLinks[]->{
    title,
    slug {
      current
    }
  },
  journalLinks[]->{
    title,
    shortTitle,
    slug {
      current
    }
  },
  externalLinks[] {
    linkTitle,
    linkUrl
  },
  slug {
    current
  },
  "works": *[_type == "works"]{
    title
  },
  "related": *[_type == "journal" && date < ^.date && slug.current != $slug && routedArticle] | order(date desc)[0..2] {
    title,
    routedArticle,
    heroImage {
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
    date,
    slug {
      current
    }
  },
  "relatedFirst": *[_type == "journal" && slug.current != $slug && routedArticle] | order(date desc)[0..2] {
    title,
    routedArticle,
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
    }
  },
  "globals": *[_type == "globals"][0]{
    footerTickerItems[]
  }
}`

const pageService = new SanityPageService(query)

export default function JournalSlug(initialData) {
  const { data: { title, contentText, contentImages, journalLinks, projectLinks, externalLinks, slug, works, related, relatedFirst, heroImage, globals } } = pageService.getPreviewHook(initialData)()
  const [introContext, setIntroContext] = useContext(IntroContext);
  
  useEffect(() => {
    setIntroContext(true)
  },[]);

  return (
    <Layout>
      <NextSeo title={title} />

      <Header active="journal" works={works.length} />
      
      <LazyMotion features={domAnimation}>
        <m.main
          variants={fade}
          initial="initial"
          animate="enter"
          exit="exit"
          className="flex flex-wrap -m-2"
        >
          <m.article className="w-full md:w-1/2 md:h-screen p-2 pt-16 md:pt-20 xl:pt-20 md:sticky top-0 flex flex-wrap">
            <div className="w-full">
              <div className="max-w-[500px]">
                <h1 className="text-[9vw] md:text-4xl xl:text-5xl leading-[1.1] md:leading-[1.1] xl:leading-[1.1] mb-4 md:max-w-[60vw] w-11/12 md:w-full">{title}</h1>
              </div>

              {(projectLinks || externalLinks || journalLinks) && (
                <div className="mt-5 md:mt-8">
                  {(projectLinks) && (
                    <>
                      {projectLinks.map((e, i) => {
                        return (
                          <div key={i}>
                            <Link href={`/works/${e.slug.current}`}>
                              <a className="inline-block text-lg md:text-xl group relative overflow-hidden">
                                <span className="block">See {e.title}</span>
                                <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
                              </a>
                            </Link>
                          </div>
                        )
                      })}
                    </>
                  )}
                  
                  {(journalLinks) && (
                    <>
                      {journalLinks.map((e, i) => {
                        return (
                          <div key={i}>
                            <Link href={`/journal/${e.slug.current}`}>
                              <a className="inline-block text-lg md:text-xl group relative overflow-hidden">
                                <span className="block">See {e.shortTitle ? e.shortTitle : e.title}</span>
                                <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
                              </a>
                            </Link>
                          </div>
                        )
                      })}
                    </>
                  )}
                  
                  {(externalLinks) && (
                    <>
                      {externalLinks.map((e, i) => {
                        return (
                          <div key={i}>
                            <a target="_blank" rel="noreferrer noopener" href={e.linkUrl} className="inline-block text-lg md:text-xl group relative overflow-hidden ">
                              <span className="inline-block">{e.linkTitle ? e.linkTitle : 'More Information' }</span>
                              <svg className={`w-[12px] ml-[6px] mt-[-4px] inline-block text-black`} viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.8 10.267H.733v-8.25h4.4v-.734H0V11h9.533V5.867H8.8v4.4Z" fill="currentColor"/><path d="M6.6 0v.733h3.148L3.957 6.524l.519.519 5.79-5.791V4.4H11V0H6.6Z" fill="currentColor"/></svg>
                              <span className="w-[90%] group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
                            </a>
                          </div>
                        )
                      })}
                    </>
                  )}
                </div>
              )}
            </div>

            {contentText && (
              <div className="w-full mt-64 md:mt-auto">
                <div className="content max-w-[500px] w-11/12 md:w-full">
                  <SanityBlockContent serializers={{ container: ({ children }) => children }} blocks={contentText} />
                </div>
              </div>
            )}
          </m.article>
          <m.aside className="w-full md:w-1/2 pt-16 md:pt-32 xl:pt-48 p-2 md:pl-5 xl:pl-0 self-end">
            {!contentImages && (
              <div className={`relative overflow-hidden w-full ${contentImages ? 'mb-4' : 'mb-0'}`}>
                <Image
                  image={heroImage}
                  focalPoint={heroImage.asset.hotspot}
                  layout="responsive"
                  className={`block w-full`}
                  widthOverride={1600}
                  noCaption
                />
              </div>
            )}
            
            {contentImages && (
              <div className="w-full">
                  {contentImages.map((e, i) => {
                    return (
                      <div className={`relative overflow-hidden w-full ${(i + 1) !== contentImages.length ? 'mb-4' : 'mb-0'}`} key={i}>
                        <Image
                          image={e}
                          focalPoint={e.asset.hotspot}
                          layout="responsive"
                          className={`block w-full`}
                          noCaption
                        />
                      </div>
                    )
                  })}
              </div>
            )}
          </m.aside>
        </m.main>

        <m.div className="pt-20 md:pt-40 xl:pt-56">
          <div className="mb-3">
            <span className="inline-block text-lg leading-tight  xl:text-xl relative xl:leading-tight">More News</span>
            <Link href="/journal">
              <a className="block text-lg leading-tight  xl:text-xl relative xl:leading-tight text-gray hover:text-black focus:text-black">See All</a>
            </Link>
          </div>

          { related.length > 2 ? (
            <div className="grid grid-cols-10 gap-2 md:gap-5">
              {related.map((e, i) => {
                let d = new Date(e.date);
                let ye = new Intl.DateTimeFormat('en', { year: '2-digit' }).format(d);
                let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
                let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

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
                  <Link href={`/journal/${e.slug.current}`} key={i}>
                    <a
                      className={`${layout} col-span-10 md:col-span-3 block group mb-4 md:mb-0`}
                    >
                      <ReactCursorPosition>
                        <Teaser
                          height={height}
                          image={e.heroImage}
                        />
                      </ReactCursorPosition>
                      <span className="block overflow-hidden relative">
                        <span className="block text-lg leading-none xl:text-xl xl:leading-[1] my-1 md:my-2 text-gray uppercase">{da}.{mo}.{ye}</span>
                      </span>

                      <span className="block overflow-hidden relative">
                        <span className="block text-lg leading-[1.15] xl:text-xl xl:leading-[1.15] mb-1 w-9/12">{e.title}</span>
                      </span>
                    </a>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="grid grid-cols-10 gap-2 md:gap-5">
              {relatedFirst.map((e, i) => {
                let d = new Date(e.date);
                let ye = new Intl.DateTimeFormat('en', { year: '2-digit' }).format(d);
                let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
                let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

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
                  <Link href={`/journal/${e.slug.current}`} key={i}>
                    <a
                      className={`${layout} col-span-10 md:col-span-3 block group mb-8 md:mb-0`}
                    >
                      <ReactCursorPosition>
                        <Teaser
                          height={height}
                          image={e.heroImage}
                        />
                      </ReactCursorPosition>
                      <span className="block overflow-hidden relative">
                        <span className="block text-lg leading-none mt0 mb-1 md:my-2 text-gray uppercase">{da}.{mo}.{ye}</span>
                      </span>

                      <span className="block overflow-hidden relative">
                        <span className="block text-lg xl:text-xl leading-[1.15] xl:leading-[1.15] mb-1 w-11/12 md:w-full">{e.title}</span>
                      </span>
                    </a>
                  </Link>
                )
              })}
            </div>
          )}
        </m.div>
      </LazyMotion>

      <Footer footerTickerItems={globals.footerTickerItems} />
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
  const paths = await pageService.fetchPaths('journal')
  return {
    paths: paths,
    fallback: false,
  };
}