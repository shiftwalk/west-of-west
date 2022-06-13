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
  }
}`

const pageService = new SanityPageService(query)

export default function JournalSlug(initialData) {
  const { data: { title, contentText, contentImages, slug, works } } = pageService.getPreviewHook(initialData)()

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