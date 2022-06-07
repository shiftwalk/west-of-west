import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import SanityPageService from '@/services/sanityPageService'
import Image from '@/components/image'
import SanityBlockContent from '@sanity/block-content-to-react'
import { useState } from 'react'

const query = `{
  "studio": *[_type == "studio"][0]{
    title,
    heroImageLeft {
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
    heroImageRight {
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
    contentImages[] {
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
    heroText,
    servicesText,
    services[],
    contentHeading,
    seo {
      ...,
      shareGraphic {
        asset->
      }
    }
  },
  "team": *[_type == "team"] | order(order asc) {
    name,
    location,
    role,
    principle,
    image {
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
    bioText,
    order
  }
}`

const pageService = new SanityPageService(query)

export default function Studio(initialData) {
  const { data: { studio, team } } = pageService.getPreviewHook(initialData)()
  const [hovering, setHovering] = useState(false);

  return (
    <Layout>
      <NextSeo title={studio.title} />

      <Header active="studio" />
      
      <LazyMotion features={domAnimation}>
        <m.main
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
                    image={studio.heroImageLeft}
                    focalPoint={studio.heroImageLeft.hotspot}
                    layout="fill"
                    widthOverride={1400}
                    className={`w-full inset-0 h-full object-cover object-center`}
                  />
                </div>
              </div>

              <div className="col-span-10 md:col-span-4 md:col-start-7">
                <div className="content content--lg my-8 md:my-20 xl:my-36 2xl:my-40 w-[80%] md:w-[70%] xl:w-[63%]">
                  <p>{studio.heroText}</p>
                </div>

                <div className="w-full h-[70vw] md:h-[49vw] overflow-hidden relative">
                  <Image
                    image={studio.heroImageRight}
                    focalPoint={studio.heroImageRight.hotspot}
                    layout="fill"
                    widthOverride={1400}
                    className={`w-full inset-0 h-full object-cover object-center`}
                  />
                </div>
              </div>

              <div className="col-span-10 md:col-span-8 md:col-start-3 lg:col-span-7 lg:col-start-4 xl:col-span-6 xl:col-start-5 mb-12 md:mb-20 xl:mb-32 2xl:mb-36">
                <span className="block indent-[12%] md:indent-[25%] text-[5.55vw] md:text-[3.3vw] xl:text-[2.5vw] leading-[1.1] md:leading-[1.1] xl:leading-[1.1] max-w-[80vw] md:w-[68%] mt-4 mb-12 md:my-16 xl:my-28 2xl:my-36">{studio.contentHeading}</span>

                <ul className="archive-list" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
                  {team.map((e, i) => {
                    return (
                      <li className="block" key={i}>
                        <span
                          className={`w-full border-b border-b-[#EFEFEF] flex flex-wrap items-start py-4 group transition-opacity ease-in-out duration-300 relative archive-list__item`}
                        >
                          <span className={`absolute top-0 left-0 right-0 w-full h-[1px] bg-[#EFEFEF] ${ i == 0 ? 'mt-[0px]' : 'mt-[-1px]' }`}></span>
                          <span className="block w-auto uppercase text-xs leading-tight overflow-hidden relative pr-4 md:pr-12 xl:pr-20 self-center">
                            <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300">WW.{e.location == 'la' ? 'LA' : 'OR'}</span>
                            <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300">WW.{e.location == 'la' ? 'LA' : 'OR'}</span>
                          </span>
                          <span className="block flex-1 md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-left overflow-hidden relative pr-3">
                            <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300">{e.name}</span>
                            <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300">{e.name}</span>
                          </span>
                          <span className="flex-1 md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-left hidden md:block relative overflow-hidden pr-3">
                            <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300 capitalize">{e.principle && 'Principle' }</span>
                            <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300 capitalize">{e.principle && 'Principle' }</span>
                          </span>
                          <span className="block w-[140px] md:w-[150px] xl:w-[160px] md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-right relative overflow-hidden">
                            <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-300">{e.role}</span>
                            <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-300">{e.role}</span>
                          </span>
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div className="col-span-10 gap-5 -m-2 mb-12 md:mb-20 xl:mb-32 2xl:mb-32">
                <div className="w-full h-[70vw] md:h-[57vw] relative overflow-hidden">
                  <Image
                    image={studio.contentImages[0]}
                    focalPoint={studio.contentImages[0].hotspot}
                    layout="fill"
                    widthOverride={1920}
                    className={`w-full inset-0 h-full object-cover object-center`}
                  />
                </div>
              </div>

              <div className="col-span-10 md:col-span-3 md:col-start-3 md:mb-16">
                <div className="content lg:w-9/12">
                  <SanityBlockContent serializers={{ container: ({ children }) => children }} blocks={studio.servicesText} />
                </div>
              </div>

              <div className="col-span-10 md:col-span-2 md:col-start-7">
                <div className="content">
                  <ul>
                    {studio.services.map((e, i) => {
                      return (
                        <li key={i}>{e}</li>
                      )
                    })}
                  </ul>
                </div>
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
  const cms = await pageService.fetchQuery(context)

  return {
    props: { ...cms }
  }
}