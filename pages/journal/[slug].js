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

const query = `*[_type == "journal" && slug.current == $slug][0]{
  title,
  contentText,
  contentImages[] {
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
  slug {
    current
  },
  "works": *[_type == "works"]{
    title
  },
  "related": *[_type == "journal" && slug.current != $slug][0..2]{
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
      }
    },
    date,
    slug {
      current
    }
  }
}`

const pageService = new SanityPageService(query)

export default function JournalSlug(initialData) {
  const { data: { title, contentText, contentImages, slug, works, related } } = pageService.getPreviewHook(initialData)()

  return (
    <Layout>
      <NextSeo title={title} />

      <Header active="journal" works={works.length} />
      
      <LazyMotion features={domAnimation}>
        <m.main
          initial="initial"
          animate="enter"
          exit="exit"
          className="flex flex-wrap -m-2"
        >
          <m.article className="w-full md:w-1/2 h-screen p-2 pt-16 md:pt-20 xl:pt-20 sticky top-0 flex flex-wrap">
            <div className="w-full">
              <div className="max-w-[450px]">
                <h1 className="text-3xl md:text-4xl xl:text-5xl leading-[1.1] md:leading-[1.1] xl:leading-[1.1] mb-4 md:max-w-[60vw]">{title}</h1>
              </div>
            </div>

            {contentText && (
              <div className="w-full mt-auto">
                <div className="content max-w-[400px]">
                  <SanityBlockContent serializers={{ container: ({ children }) => children }} blocks={contentText} />
                </div>
              </div>
            )}
          </m.article>
          <m.aside className="w-full md:w-1/2 pt-16 md:pt-32 xl:pt-48 p-2 md:pl-5 xl:pl-0 self-end">
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

        <m.div className="pt-20 md:pt-32 xl:pt-40">
          <div className="mb-3">
            <span className="inline-block text-xl leading-tight lg:text-xl xl:text-2xl relative md:leading-tight xl:leading-tight">Latest News</span>
            <Link href="/journal">
              <a className="inline-block text-xl leading-tight lg:text-xl xl:text-2xl relative md:leading-tight xl:leading-tight text-gray ml-2 hover:text-black focus:text-black">See All</a>
            </Link>
          </div>
          
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
                      <span className="block text-[10px] leading-none my-1 md:my-2 text-gray uppercase">{da}.{mo}.{ye}</span>
                    </span>

                    <span className="block overflow-hidden relative">
                      <span className="block text-lg xl:text-xl leading-none xl:leading-[1.15] mb-1">{e.title}</span>
                    </span>
                  </a>
                </Link>
              )
            })}
          </div>
        </m.div>
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
  const paths = await pageService.fetchPaths('journal')
  return {
    paths: paths,
    fallback: false,
  };
}