import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import SanityPageService from '@/services/sanityPageService'
import { useState } from 'react'

const query = `{
  "contact": *[_type == "contact"][0]{
    title,
    heroHeading,
    locations[] {
      title,
      coordinates,
      address
    },
    telephone,
    generalEmail,
    pressEmail,
    newBusinessEmail,
    employmentEmail,
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

export default function Contact(initialData) {
  const { data: { contact, works } } = pageService.getPreviewHook(initialData)()
  const [hovering, setHovering] = useState(false);

  return (
    <Layout>
      <NextSeo title={contact.title} />

      <Header active="contact" works={works.length} />
      
      <LazyMotion features={domAnimation}>
        <m.main
          variants={fade}
          initial="initial"
          animate="enter"
          exit="exit"
          className=""
        >
          <m.article>
            <div className="grid grid-cols-10 gap-x-5 gap-y-2 md:h-[calc(100vh-8px)] pt-24 md:pt-32 xl:pt-40 mb-8 md:mb-32 xl:mb-40">
              <div className="col-span-10 md:col-span-2 flex flex-wrap h-full">
                <div className="content--lg w-full pb-5">
                  <p className="w-[95%] lg:w-8/12">{contact.heroHeading}</p>
                </div>
                
                <div className="w-full self-end">
                  {contact.locations.map((e, i) => {
                    return (
                      <div key={i} className={`w-full md:w-11/12 lg:w-10/12 xl:w-1/2 max-w-[130px] ${i == 0 ? 'mb-4' : 'text-gray' }`}>
                        <span className="block">{e.title}</span>
                        <span className="block">{e.address}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="col-span-10 md:col-span-8 pb-2">
                <div className="w-full h-[66vw] md:h-full bg-gray bg-opacity-20 flex items-center justify-center"><span className="block opacity-20">Map Here...</span></div>
              </div>
            </div>

            <div className="grid grid-cols-10 gap-x-5 gap-y-2 mb-12 md:mb-32 xl:mb-40">
              <div className="col-span-10 md:col-span-5 md:col-start-3">
              <ul className="archive-list" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
                <li className="block">
                  <a
                    href={`mailto:${contact.generalEmail}`}
                    className={`w-full border-b border-b-[#EFEFEF] flex flex-wrap items-start py-4 group relative archive-list__item`}
                  >
                    <span className="absolute top-0 left-0 right-0 w-full h-[1px] bg-[#EFEFEF] mt-[0px]mt-[-1px]"></span>
                    <span className="block flex-1 md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-left overflow-hidden relative pr-3">
                      <span className="block">General Enquiries</span>
                    </span>
                    <span className="block w-auto md:w-auto xl:w-auto md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-right relative overflow-hidden">
                      <span className="block">{contact.generalEmail}</span>
                      <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
                    </span>
                  </a>
                </li>
                <li className="block">
                  <a
                    href={`mailto:${contact.newBusinessEmail}`}
                    className={`w-full border-b border-b-[#EFEFEF] flex flex-wrap items-start py-4 group relative archive-list__item`}
                  >
                    <span className="absolute top-0 left-0 right-0 w-full h-[1px] bg-[#EFEFEF] mt-[-1px]"></span>
                    <span className="block flex-1 md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-left overflow-hidden relative pr-3">
                      <span className="block">New Business</span>
                    </span>
                    <span className="block w-auto md:w-auto xl:w-auto md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-right relative overflow-hidden">
                      <span className="block">{contact.newBusinessEmail}</span>
                      <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
                    </span>
                  </a>
                </li>
                <li className="block">
                  <a
                    href={`mailto:${contact.pressEmail}`}
                    className={`w-full border-b border-b-[#EFEFEF] flex flex-wrap items-start py-4 group relative archive-list__item`}
                  >
                    <span className="absolute top-0 left-0 right-0 w-full h-[1px] bg-[#EFEFEF] mt-[-1px]"></span>
                    <span className="block flex-1 md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-left overflow-hidden relative pr-3">
                      <span className="block">Press</span>
                    </span>
                    <span className="block w-auto md:w-auto xl:w-auto md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-right relative overflow-hidden">
                      <span className="block">{contact.pressEmail}</span>
                      <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
                    </span>
                  </a>
                </li>
                <li className="block">
                  <a
                    href={`mailto:${contact.employmentEmail}`}
                    className={`w-full border-b border-b-[#EFEFEF] flex flex-wrap items-start py-4 group relative archive-list__item`}
                  >
                    <span className="absolute top-0 left-0 right-0 w-full h-[1px] bg-[#EFEFEF] mt-[-1px]"></span>
                    <span className="block flex-1 md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-left overflow-hidden relative pr-3">
                      <span className="block">Employment</span>
                    </span>
                    <span className="block w-auto md:w-auto xl:w-auto md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-right relative overflow-hidden">
                      <span className="block">{contact.employmentEmail}</span>
                      <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
                    </span>
                  </a>
                </li>
                <li className="block">
                  <a
                    href={`tel:${contact.telephone}`}
                    className={`w-full border-b border-b-[#EFEFEF] flex flex-wrap items-start py-4 group relative archive-list__item`}
                  >
                    <span className="absolute top-0 left-0 right-0 w-full h-[1px] bg-[#EFEFEF] mt-[-1px]"></span>
                    <span className="block flex-1 md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-left overflow-hidden relative pr-3">
                      <span className="block">Call</span>
                    </span>
                    <span className="block w-auto md:w-auto xl:w-auto md:text-lg xl:text-xl md:leading-tight xl:leading-tight text-right relative overflow-hidden">
                      <span className="block">{contact.telephone}</span>
                      <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
                    </span>
                  </a>
                </li>
              </ul>
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