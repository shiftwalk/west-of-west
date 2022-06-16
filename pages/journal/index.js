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

const query = `{
  "journal": *[_type == "journal"]{
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
            <ul className="mt-4 md:mt-6 grid grid-cols-10 gap-x-5 gap-y-[5vw] items-start">
              {journal.map((e, i) => {
                let d = new Date(e.date);
                let ye = new Intl.DateTimeFormat('en', { year: '2-digit' }).format(d);
                let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
                let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

                let layout = 'md:col-start-0'
                let height = 'h-[60vw] md:h-[13vw]'
                // let disabledClass = 'grayscale opacity-30'

                if (i == 0 || i == 8  || i == 17) {
                  layout = 'md:col-start-1'
                }
                if (i == 1 || i == 9  || i == 18) {
                  layout = 'md:col-start-6'
                }
                if (i == 2 || i == 10  || i == 19) {
                  layout = 'md:col-start-9'
                }
                if (i == 3 || i == 11  || i == 20) {
                  layout = 'md:col-start-2'
                }
                if (i == 4 || i == 12  || i == 21) {
                  layout = 'md:col-start-4'
                }
                if (i == 5 || i == 13  || i == 22) {
                  layout = 'md:col-start-9'
                }
                if (i == 6 || i == 14 || i == 23) {
                  layout = 'md:col-start-0'
                }
                if (i == 7 || i == 15 || i == 24) {
                  layout = 'md:col-start-7'
                }
                if (i == 8 || i == 16 || i == 25) {
                  layout = 'md:col-start-1'
                }

                return (
                  <Link href={`/journal/${e.slug.current}`} key={i}>
                    <a
                      className={`${layout} col-span-10 md:col-span-2 block group mb-4 md:mb-0`}
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