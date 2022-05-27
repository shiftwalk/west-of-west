import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import SanityPageService from '@/services/sanityPageService'
import Link from 'next/link'
import BlockContent from '@sanity/block-content-to-react'

const query = `*[_type == "works" && slug.current == $slug][0]{
  title,
  introText,
  locationCity,
  locationState,
  client,
  year,
  status,
  sector,
  heroImages[] {
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
  }
}`

const pageService = new SanityPageService(query)

export default function WorksSlug(initialData) {
  const { data: { title, introText, locationCity, locationState, heroImages, client, year, status, sector, slug } } = pageService.getPreviewHook(initialData)()

  return (
    <Layout>
      <NextSeo title="Works" />

      <Header active="works" />
      
      <LazyMotion features={domAnimation}>
        <m.main
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <m.article>
            <div className="h-[calc(100vh-16px)] flex flex-wrap items-end pt-20 mb-20 md:mb-32 xl:mb-52">
              <div className="w-full md:w-[20vw]">
                <span className="block text-[10px] uppercase mb-8">ww.018</span>
                <h1 className="block lg:text-xl xl:text-2xl relative md:leading-tight xl:leading-tight mb-0 pb-0">{title}</h1>
                <span className="block lg:text-xl xl:text-2xl relative md:leading-tight xl:leading-tight mb-0 pb-0 text-gray">{locationCity}{locationState && (<>, {locationState}</>)}</span>
              </div>
              <div className="w-full md:flex-1">
                <div className="flex flex-wrap w-full">
                  <div className="w-[150px]">
                    {heroImages.map((e, i) => {
                      return (
                        <img src={e.asset.url} alt="Placeholder" 
                        className="w-full pr-5 pb-5" key={i} />
                      )
                    })}
                  </div>
                  <div className="flex-1">
                    <div className="bg-red-500 w-full h-[75vh] relative overflow-hidden">
                      <img src={heroImages[0].asset.url} alt="Placeholder" className="w-full h-full absolute inset-0 object-cover object-center" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-10">
              <div className="col-span-9 md:col-span-3">
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
                <span className="block indent-[24.25%] text-[5.55vw] md:text-[3.3vw] xl:text-[2.5vw] leading-[1.15] md:leading-[1.15] xl:leading-[1.15] max-w-[80vw] mt-4 md:mt-6">{introText}</span>
              </div>
            </div>
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