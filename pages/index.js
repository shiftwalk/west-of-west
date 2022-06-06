import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import SanityPageService from '@/services/sanityPageService'
import Image from '@/components/image'
import Link from 'next/link'

const query = `{
  "home": *[_type == "home"][0]{
    title,
    heroFeaturedWorks[] -> {
      title,
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
    seo {
      ...,
      shareGraphic {
        asset->
      }
    }
  },
}`

const pageService = new SanityPageService(query)

export default function Home(initialData) {
  const { data: { home } } = pageService.getPreviewHook(initialData)()

  return (
    <Layout>
      <NextSeo title={home.title} />

      <Header active="home" />
      
      <LazyMotion features={domAnimation}>
        <m.div
          initial="initial"
          animate="enter"
          exit="exit"
          className=""
        >
          <div className="-m-2">
            <div className="h-[65vh] md:h-screen w-full mb-12 md:mb-16 xl:mb-24">
              <div className="bg-gray bg-opacity-40 w-full h-full relative overflow-hidden">
                <Image
                  image={home.heroFeaturedWorks[0].heroImages[0]}
                  focalPoint={home.heroFeaturedWorks[0].heroImages[0].asset.hotspot}
                  layout="fill"
                  priority
                  widthOverride={1400}
                  className="w-full h-full absolute inset-0 object-cover object-center"
                  noCaption
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-10 gap-3 md:gap-5">
            <div className="col-span-10 md:col-span-8 xl:col-span-7">
              <h1 className="block indent-[25.35%] xl:indent-[28.95%] text-[9vw] md:text-[7.25vw] xl:text-[5.85vw] leading-[0.95] md:leading-[0.95] xl:leading-[0.95] max-w-[80vw] mb-12 md:mb-20 xl:mb-32">We are an architecture &amp; design studio that creates experience driven buildings and interiors.</h1>
            </div>
          </div>

          <div className="grid grid-cols-10 gap-3 md:gap-5 mb-5">
            <div className="col-span-10 md:col-span-3">
              <div className="w-full bg-gray bg-opacity-20 h-[50vw] md:h-[28vw] mb-2"></div>
              
              <Link href="/works">
                <a className="inline-block text-xl md:text-2xl group relative overflow-hidden">
                  <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300 delay-[50ms]">Explore Works</span>
                  <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300 delay-[50ms]">Explore Works</span>
                  <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
                </a>
              </Link>
            </div>

            <div className="md:col-start-7 col-span-10 md:col-span-4 md:mt-32 xl:mt-48 md:text-right">
              <div className="w-full bg-gray bg-opacity-20 h-[50vw] md:h-[38vw] mb-2"></div>
              
              <Link href="/works">
                <a className="inline-block text-xl md:text-2xl group relative overflow-hidden">
                  <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300 delay-[50ms]">See Studio</span>
                  <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300 delay-[50ms]">See Studio</span>
                  <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
                </a>
              </Link>
            </div>

            <div className="col-span-10 md:col-start-3 md:col-span-3 md:-mt-32 xl:-mt-48">
              <div className="w-full bg-gray bg-opacity-20 h-[50vw] md:h-[20vw] mb-2"></div>
              
              <Link href="/works">
                <a className="inline-block text-xl md:text-2xl group relative overflow-hidden">
                  <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300 delay-[50ms]">Latest News Article</span>
                  <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300 delay-[50ms]">Latest News Article</span>
                  <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
                </a>
              </Link>
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