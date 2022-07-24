import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import { fade } from '@/helpers/transitions'
import SanityPageService from '@/services/sanityPageService'
import Image from '@/components/image'
import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { IntroContext } from 'context/intro'

const query = `{
  "studio": *[_type == "studio"][0]{
    contentImage {
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
  },
  "worksAll": *[_type == "works"]{
    title
  },
  "globals": *[_type == "globals"][0]{
    footerTickerItems[]
  }
}`

const pageService = new SanityPageService(query)

export default function Error404(initialData) {
  const { data: { studio, team, worksAll, globals } } = pageService.getPreviewHook(initialData)()
  const [hovering, setHovering] = useState(false);
  const [introContext, setIntroContext] = useContext(IntroContext);

  useEffect(() => {
    setIntroContext(true)
  },[]);

  return (
    <Layout>
      <NextSeo title="404: Page Not Found" />

      <Header works={worksAll.length} />
      
      <LazyMotion features={domAnimation}>
        <m.main
          variants={fade}
          initial="initial"
          animate="enter"
          exit="exit"
          className="pt-24 md:pt-32 xl:pt-40"
        >
          <m.article>
            <div className="grid grid-cols-10 gap-5">
              <div className="col-span-10 md:col-span-5">
                <div className="w-full h-[70vw] md:h-[58vw] overflow-hidden relative">
                  <Image
                    image={studio.contentImage}
                    focalPoint={studio.contentImage.hotspot}
                    layout="fill"
                    widthOverride={1400}
                    className={`w-full inset-0 h-full object-cover object-center`}
                  />
                </div>
              </div>

              <div className="col-span-10 md:col-span-4 md:col-start-7">
                <div className="content content--no-link content--lg my-8 md:my-20 xl:my-36 2xl:my-40 w-[80%] md:w-[70%] xl:w-[63%]">
                  <h1 className="block text-[5.55vw] md:text-[3.3vw] xl:text-[2.5vw] leading-[1.1] md:leading-[1.1] xl:leading-[1.1] max-w-[80vw] md:w-[68%]">404 Error</h1>

                  <p>Sorry, that page could not be found.<br/>
                    <Link href="/">
                      <a className="inline-block leading-tight group relative overflow-hidden mb-[-5px]">
                        <span className="block">Back home</span>
                        <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
                      </a>
                    </Link>
                  </p>
                </div>

                {/* <div className="w-full h-[70vw] md:h-[49vw] overflow-hidden relative">
                  <Image
                    image={studio.contentImage}
                    focalPoint={studio.contentImage.hotspot}
                    layout="fill"
                    widthOverride={1400}
                    className={`w-full inset-0 h-full object-cover object-center`}
                  />
                </div> */}
              </div>
            </div>
          </m.article>
        </m.main>
      </LazyMotion>

      <Footer footerTickerItems={globals.footerTickerItems} />
    </Layout>
  )
}

export async function getStaticProps(context) {
  const cms = await pageService.fetchQuery(context)

  return {
    props: { ...cms }
  }
}