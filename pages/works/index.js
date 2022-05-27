import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { fade } from '@/helpers/transitions'
import Link from 'next/link'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import SanityPageService from '@/services/sanityPageService'

const query = `{
  "works": *[_type == "works"]{
    title,
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
    expertise,
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
}`

const pageService = new SanityPageService(query)

export default function Works(initialData) {
  const { data: { works } } = pageService.getPreviewHook(initialData)()

  return (
    <Layout>
      <NextSeo title="Works" />

      <Header active="works" />
      
      <LazyMotion features={domAnimation}>
        <m.main
          initial="initial"
          animate="enter"
          exit="exit"
          className="pt-24 md:pt-32 xl:pt-40"
        >
          <m.article>
            <h1 className="text-3xl md:text-4xl xl:text-5xl mb-4">Works</h1>
            <div className="content max-w-3xl mb-4">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>

              <p>Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              
              <h2 className="mt-8 md:mt-12 xl:mt-16">Works Entries: CMS</h2>
              <p>Work in progress...</p>
            </div>

            <ul className="mt-4 md:mt-6 grid grid-cols-3 gap-5">
              {works.map((e, i) => {
                return (
                  <Link href={`/works/${e.slug.current}`} key={i}>
                    <a className="block col-span-3 md:col-span-1 group mb-4 md:mb-0">
                      <div className="mb-3 relative overflow-hidden h-[22vw]">
                        <img src={e.heroImages[0].asset.url} className="w-full h-full absolute inset-0 object-center object-cover" alt="test" />

                        <div className="bg-black bg-opacity-40 absolute inset-0 z-10 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity ease-in-out duration-500 p-3">
                          <svg className="w-10 translate-x-[-150%] group-hover:translate-x-0 transition-translate ease-in-out duration-500 delay-[50ms]" viewBox="0 0 42 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m30.183 0-1.986 2.017 8.426 8.557H0v2.852h36.623l-8.426 8.557L30.183 24 42 12 30.183 0Z" fill="#fff"/></svg>

                          <div className="absolute bottom-0 right-0 p-3 text-right">
                            <span className="block text-xl leading-none mb-1 text-white relative overflow-hidden">
                              <span className="block translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-500 text-2xl leading-none text-white delay-[50ms]">{e.title}</span>
                            </span>
                            <span className="block translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-500 text-2xl leading-none text-gray delay-[50ms] capitalize">{e.expertise}</
                            span>
                          </div>
                        </div>
                      </div>
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