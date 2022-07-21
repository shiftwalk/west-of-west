import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import SanityPageService from '@/services/sanityPageService'
import Image from '@/components/image'
import SanityBlockContent from '@sanity/block-content-to-react'
import { useContext, useEffect, useState } from 'react'
import { IntroContext } from 'context/intro'
import TeamModal from '@/components/team-modal'

const query = `{
  "studio": *[_type == "studio"][0]{
    title,
    workBlockHeading,
    workBlockText,
    practiceBlockHeading,
    practiceBlockText,
    quote,
    quoteAuthor,
    pastTeam,
    recognition,
    publications,
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
    seo {
      ...,
      shareGraphic {
        asset->
      }
    }
  },
  "team": *[_type == "team"] | order(order asc) {
    name,
    accreditations,
    role,
    hasBio,
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
  },
  "works": *[_type == "works"]{
    title
  }
}`

const pageService = new SanityPageService(query)

export default function Studio(initialData) {
  const { data: { studio, team, works } } = pageService.getPreviewHook(initialData)()
  const [hovering, setHovering] = useState(false);
  const [currentTeamBio, setCurrentTeamBio] = useState(null);
  const [introContext, setIntroContext] = useContext(IntroContext);

  useEffect(() => {
    setIntroContext(true)
  },[]);

  const updateTeamBio = (e) => {
    setCurrentTeamBio(e)
  }

  return (
    <Layout>
      <NextSeo title={studio.title} />

      <Header active="studio" works={works.length} />
      
      <LazyMotion features={domAnimation}>
        <m.main
          variants={fade}
          initial="initial"
          animate="enter"
          exit="exit"
          className="pt-24 md:pt-48 xl:pt-56"
        >
          <article>
            <div className="mb-16 md:mb-32 xl:mb-48">
              <h1 className="block text-[5.55vw] md:text-[3.5vw] lg:text-[3.2vw] xl:text-[2.8vw] 2xl:text-[2.5vw] leading-[1.1] md:leading-[1.1] xl:leading-[1.1] max-w-[70vw] xl:max-w-[60vw] mb-16 md:mb-24 xl:mb-32 2xl:mb-40">{studio.workBlockHeading}</h1>

              <div className="grid grid-cols-10 gap-5">
                <div className="col-span-2">
                  <div className="content">
                    <p className="">Work</p>
                  </div>
                </div>
                <div className="col-span-7 md:col-span-5 col-start-3 content max-w-[900px]">
                  <p>{studio.workBlockText}</p>
                </div>
              </div>
            </div>

            <div className="mb-16 md:mb-32 xl:mb-48 w-full h-[60vw] md:h-[55vw] overflow-hidden relative">
              <Image
                image={studio.contentImage}
                focalPoint={studio.contentImage.hotspot}
                layout="fill"
                sizes="(min-width: 768px) 99vw, 100vw"
                className={`w-full inset-0 h-full object-cover object-center`}
              />
            </div>

            <div className="mb-16 md:mb-32 xl:mb-48">
              <h2 className="block text-[5.55vw] md:text-[3.5vw] lg:text-[3.2vw] xl:text-[2.8vw] 2xl:text-[2.5vw] leading-[1.1] md:leading-[1.1] xl:leading-[1.1] max-w-[70vw] xl:max-w-[60vw] mb-16 md:mb-24 xl:mb-32 2xl:mb-40">{studio.practiceBlockHeading}</h2>

              <div className="grid grid-cols-10 gap-5">
                <div className="col-span-2">
                  <div className="content">
                    <p className="">Practice</p>
                  </div>
                </div>
                <div className="col-span-7 md:col-span-5 col-start-3 content max-w-[900px]">
                  <p>{studio.practiceBlockText}</p>
                </div>
              </div>
            </div>

            <div className="mb-16 md:mb-32 xl:mb-48">
              <h2 className="block text-[5.55vw] md:text-[3.5vw] lg:text-[3.2vw] xl:text-[2.8vw] 2xl:text-[2.5vw] leading-[1.1] md:leading-[1.1] xl:leading-[1.1] max-w-[70vw] xl:max-w-[60vw] mb-16 md:mb-24 xl:mb-32 2xl:mb-40">“{studio.quote}”<span className="block text-gray">- {studio.quoteAuthor}</span></h2>
            </div>

            <div className="grid grid-cols-10 gap-5 mb-12 md:mb-20 xl:mb-28">
              <div className="col-span-2">
                <div className="content">
                  <p className="">Team</p>
                </div>
              </div>
              <div className="col-span-8 md:col-span-6 col-start-3 content md:max-w-[440px]">
                <ul className="w-full">
                  {team.map((e, i) => {
                    return (
                      <li className="flex flex-wrap w-full" key={i}>
                        <span className="block flex-1 text-gray">{e.role}</span>
                        {e.hasBio ? (
                          <span className="block w-1/3 text-left ml-auto">
                            <TeamModal title={e.name}>
                              <div className="w-full">
                                <div className="w-full bg-white p-3">
                                  <span className="block text-lg xl:text-xl leading-none xl:leading-[1.15]">{e.name}</span>
                                  <span className="block text-lg xl:text-xl leading-none xl:leading-[1.15] text-gray">{e.role}</span>
                                  {e.accreditations && (
                                    <span className="block text-lg xl:text-xl leading-none xl:leading-[1.15] text-gray">{e.accreditations}</span>
                                  )}

                                  {e.image && (
                                    <div className="w-[200px] h-[250px] overflow-hidden relative block md:hidden mt-2">
                                      <Image
                                        image={e.image}
                                        focalPoint={e.image.hotspot}
                                        layout="fill"
                                        widthOverride={720}
                                        className={`w-full inset-0 h-full object-cover object-center`}
                                      />
                                    </div>
                                  )}
                                  
                                  {e.bioText && (
                                    <div className="content md:absolute bottom-0 left-0 md:ml-[50%] xl:ml-[40%] md:pr-[10%] xl:pr-[20%] pb-3 mt-5 md:mt-0">
                                      <div className="content">
                                        <SanityBlockContent serializers={{ container: ({ children }) => children }} blocks={e.bioText} />
                                      </div>
                                    </div>
                                  )}
                                  {e.image && (
                                    <div className="absolute bottom-0 left-0 m-3 w-[250px] h-[400px] overflow-hidden hidden md:block">
                                      <Image
                                        image={e.image}
                                        focalPoint={e.image.hotspot}
                                        layout="fill"
                                        widthOverride={720}
                                        className={`w-full inset-0 h-full object-cover object-center`}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </TeamModal>
                          </span>
                        ) : (
                          <span className="block w-1/3 text-left ml-auto">{e.name}</span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-10 gap-5 mb-12 md:mb-20 xl:mb-28">
              <div className="col-span-2">
                <div className="content">
                  <p className="">Past Team</p>
                </div>
              </div>
              <div className="col-span-7 md:col-span-6 col-start-3 content max-w-[700px]">
                <p>{studio.pastTeam}</p>
              </div>
            </div>

            <div className="grid grid-cols-10 gap-5 mb-12 md:mb-20 xl:mb-28">
              <div className="col-span-2">
                <div className="content">
                  <p className="">Recognition</p>
                </div>
              </div>
              <div className="col-span-7 md:col-span-6 col-start-3 content max-w-[700px]">
                <p>{studio.recognition}</p>
              </div>
            </div>

            <div className="grid grid-cols-10 gap-5 mb-12 md:mb-20 xl:mb-28">
              <div className="col-span-2">
                <div className="content">
                  <p className="">Publications</p>
                </div>
              </div>
              <div className="col-span-7 md:col-span-6 col-start-3 content max-w-[700px]">
                <p>{studio.publications}</p>
              </div>
            </div>

            <div className="grid grid-cols-10 gap-5 mb-12 md:mb-20 xl:mb-28">
              <div className="col-span-2">
                <div className="content">
                  <p className="">Site By</p>
                </div>
              </div>
              <div className="col-span-7 md:col-span-6 col-start-3 max-w-[700px]">
                <a href="https://shiftwalk.studio" className="group inline-block relative overflow-hidden md:text-lg xl:text-xl leading-tight md:leading-tight xl:leading-tight">
                  ShiftWalk Studio
                  <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
                </a>
              </div>
            </div>
          </article>
          {/* <m.article>
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


              <div className="col-span-10 md:col-span-8 md:col-start-3 lg:col-span-7 lg:col-start-4 xl:col-span-6 xl:col-start-5">
                <span className="block indent-[12%] md:indent-[25%] text-[5.55vw] md:text-[3.3vw] xl:text-[2.5vw] leading-[1.1] md:leading-[1.1] xl:leading-[1.1] max-w-[80vw] md:w-[68%] mt-4 mb-12 md:my-16 xl:my-28 2xl:my-36">{studio.contentHeading}</span>
              </div>
          
              <div className="col-span-10 md:col-span-2 xl:col-span-4 hidden lg:flex lg:flex-wrap pb-4">
                { currentTeamBio !== null && (
                  <div className="w-full xl:flex pr-[15%] self-start items-end sticky top-20 ">
                    <div className="lg:w-11/12 xl:w-5/12 h-[20vw] max-h-[360px] bg-opacity-20 relative overflow-hidden flex items-center justify-center mb-3 xl:mb-1 max-w-[260px]">
                      {team[currentTeamBio].image ? (
                        <Image
                          image={team[currentTeamBio].image}
                          focalPoint={team[currentTeamBio].image.hotspot}
                          layout="fill"
                          widthOverride={720}
                          className={`w-full inset-0 h-full object-cover object-center`}
                        />
                      ) : (
                        <svg className="w-1/3 opacity-5" viewBox="0 0 120 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M119.998 0H0v34h119.998V0Z" fill="#231F20"/><path d="M15.71 14.55h-.075l-2.02 9.735h-3.432L6.967 10.86H9.85l2.095 10.053h.075l2.057-10.053h3.145l2.057 10.053h.075L21.46 10.86h2.923l-3.25 13.425H17.75l-2.04-9.736ZM33.182 21.33c-.391 1.41-1.713 3.189-4.862 3.189-3.06 0-4.986-2.03-4.986-5.192 0-3.196 1.87-5.236 4.974-5.236 3.105 0 5.21 2.046 4.962 5.773h-7.258c.037 1.646.92 2.783 2.304 2.783 1.44 0 1.993-.892 2.184-1.543l2.682.226Zm-4.877-5.4c-1.397 0-2.164 1.015-2.261 2.244h4.538c-.097-1.23-.864-2.245-2.277-2.245Z" fill="#fff"/><path d="M39.77 17.341c-.209-.98-1.002-1.496-1.961-1.496-.96 0-1.627.414-1.627 1.176 0 .72.726.92 1.745 1.096l1.017.157c1.784.3 3.514.834 3.514 3.058 0 2.175-1.975 3.18-4.569 3.18s-4.396-1.194-4.735-3.131l2.456-.35c.24 1.186 1.077 1.735 2.31 1.735 1.121 0 1.858-.497 1.858-1.33 0-.704-.748-.985-1.87-1.174l-1.09-.174c-1.595-.258-3.279-.822-3.279-2.958 0-1.898 1.929-3.039 4.262-3.039 2.334 0 4.088 1.184 4.391 2.914l-2.421.336ZM47.544 22.24c.266 0 .599 0 .84-.012v2.057c-.252.026-1.079.037-1.726.037-2.027 0-2.908-.44-2.908-2.405v-5.816h-1.584v-1.77h1.593v-2.776h2.618v2.775h2.076v1.771h-2.076v5.156c0 .89.344.984 1.162.984h.005ZM61.672 19.314c0 3.18-1.94 5.205-5.08 5.205s-5.09-2.016-5.09-5.205c0-3.188 1.932-5.215 5.09-5.215 3.159 0 5.08 2.021 5.08 5.215Zm-2.682 0c0-2.137-.935-3.239-2.398-3.239-1.462 0-2.41 1.102-2.41 3.24 0 2.137.935 3.227 2.41 3.227 1.476 0 2.398-1.088 2.398-3.228Z" fill="#fff"/><path d="M66.608 12.42c-.69 0-1.176.203-1.176 1.067v.843h2.078v1.771h-2.078v8.184h-2.63V16.1H61.22v-1.77h1.584v-1.145c0-2.149 1.385-2.747 3.332-2.747.546.008 1.092.05 1.633.125v1.917a12.743 12.743 0 0 0-1.162-.062h.002ZM79.118 14.55h-.075l-2.01 9.735H73.6L70.383 10.86h2.883l2.099 10.053h.075l2.057-10.053h3.141l2.057 10.053h.077l2.106-10.053h2.92l-3.24 13.425h-3.396l-2.044-9.736ZM96.6 21.33c-.393 1.41-1.715 3.189-4.862 3.189-3.062 0-4.988-2.03-4.988-5.192 0-3.196 1.87-5.236 4.974-5.236 3.105 0 5.209 2.053 4.96 5.78h-7.256c.037 1.646.92 2.783 2.306 2.783 1.44 0 1.991-.892 2.182-1.543l2.684.22Zm-4.88-5.4c-1.396 0-2.163 1.015-2.26 2.244H94c-.099-1.23-.865-2.245-2.28-2.245Z" fill="#fff"/><path d="M103.187 17.341c-.208-.98-1.001-1.496-1.962-1.496-.961 0-1.627.414-1.627 1.176 0 .72.726.92 1.747 1.096l1.017.157c1.784.3 3.514.834 3.514 3.058 0 2.175-1.977 3.18-4.571 3.18-2.594 0-4.396-1.194-4.735-3.131l2.456-.35c.241 1.186 1.079 1.735 2.311 1.735 1.122 0 1.857-.497 1.857-1.33 0-.704-.748-.985-1.87-1.174l-1.088-.174c-1.596-.258-3.28-.822-3.28-2.958 0-1.898 1.93-3.039 4.261-3.039 2.332 0 4.083 1.176 4.391 2.906l-2.421.344ZM110.96 22.24c.268 0 .599 0 .842-.012v2.057c-.254.026-1.079.037-1.728.037-2.027 0-2.906-.44-2.906-2.405v-5.816h-1.584v-1.77h1.584v-2.776h2.629v2.775h2.078v1.771h-2.078v5.156c0 .89.344.984 1.163.984Z" fill="#fff"/></svg>
                      )}
                    </div>
                    
                    {team[currentTeamBio].bioText && (
                      <div className="content content--sm lg:w-11/12 xl:w-7/12 xl:pl-6">
                        <span className="block text-xl mb-1 text-gray">{team[currentTeamBio].role}</span>
                        
                        <span className="block w-auto uppercase text-xs leading-tight mb-4">
                          <span className="block">WW.{team[currentTeamBio].location == 'la' ? 'LA' : 'OR'}</span>
                        </span>

                        <div className="text-sm">
                          <SanityBlockContent serializers={{ container: ({ children }) => children }} blocks={team[currentTeamBio].bioText} />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="col-span-10 md:col-span-8 md:col-start-3 lg:col-span-7 lg:col-start-4 xl:col-span-6 xl:col-start-5 relative">
                <ul className="archive-list" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
                  {team.map((e, i) => {
                    return (
                      <li className="block" key={i} onMouseEnter={() => updateTeamBio(i)} onMouseLeave={() => updateTeamBio(null)}>
                        <span
                          className={`w-full border-b border-b-[#EFEFEF] flex flex-wrap items-start py-4 group relative archive-list__item`}
                        >
                          <span className={`absolute top-0 left-0 right-0 w-full h-[1px] bg-[#EFEFEF] ${ i == 0 ? 'mt-[0px]' : 'mt-[-1px]' }`}></span>
                          <span className="block w-auto uppercase text-xs leading-tight overflow-hidden relative pr-4 md:pr-12 xl:pr-20 self-center">
                            <span className="block00">WW.{e.location == 'la' ? 'LA' : 'OR'}</span>
                          </span>
                          <span className="block flex-1 md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-left overflow-hidden relative pr-3">
                            <span className="block">{e.name}</span>
                          </span>
                          <span className="flex-1 md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-left hidden md:block relative overflow-hidden pr-3">
                            <span className="blockation-300 capitalize">{e.principle && 'Principle' }</span>
                          </span>
                          <span className="block w-[180px] md:w-[200px] xl:w-[250px] md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-right relative overflow-hidden">
                            <span className="block">{e.role}</span>
                          </span>
                        </span>
                      </li>
                    )
                  })}
                </ul>

                <div className="mt-12">
                  <TeamModal title={'Modal Example'}>
                    <div className="w-full">
                      <div className="w-full bg-white p-3">
                        <span className="block text-lg xl:text-xl leading-none xl:leading-[1.15]">Clayton Taylor</span>
                        <span className="block text-lg xl:text-xl leading-none xl:leading-[1.15] text-gray">Principal, Architect</span>
                        <span className="block text-lg xl:text-xl leading-none xl:leading-[1.15] text-gray">NCARB, AIA</span>

                        <div className="content md:absolute bottom-0 left-0 md:ml-[40%] md:pr-[20%] pb-3 mt-8 md:mt-0">
                          <p>Clayton is a founding partner of W/W. He holds a Master of Architecture degree from the University of California, Los Angeles, and a Bachelor of Architecture degree from California Polytechnic State University, San Luis Obispo. Clayton has worked at a series of well-recognized Architectural Design firms including Coop Himmelblau in Vienna, as a Project Designer at Morphosis Architects (Los Angeles), and as an Associate at Rios Clementi Hale Studios in Hollywood. At RCHS, Clayton led design efforts on many creative office and multi-family developments in the Los Angeles area including, Columbia Square, Crossroads of the World, The Telephone Building, and Flight at Tustin Legacy. He also completed many competitive design proposals for RCHS like the Rancho Cienega Sports Complex and the Southwest School of</p>
                        </div>
                        <div className="absolute bottom-0 left-0 m-3 w-[250px] h-[400px] overflow-hidden hidden md:block">
                          <Image
                            image={team[0].image}
                            focalPoint={team[0].image.hotspot}
                            layout="fill"
                            widthOverride={720}
                            className={`w-full inset-0 h-full object-cover object-center`}
                          />
                        </div>
                      </div>
                    </div>
                  </TeamModal>
                </div>
              </div>

              <div className="col-span-10 gap-5 -m-2 mb-12 md:mb-20 xl:mb-32 2xl:mb-32 mt-12 md:mt-20 xl:mt-32 2xl:mt-36">
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
          </m.article> */}
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