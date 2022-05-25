import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import SanityPageService from '@/services/sanityPageService'
import Link from 'next/link'

const query = `*[_type == "journal" && slug.current == $slug][0]{
  title,
  slug {
    current
  }
}`

const pageService = new SanityPageService(query)

export default function JournalSlug(initialData) {
  const { data: { title, slug } } = pageService.getPreviewHook(initialData)()

  return (
    <Layout>
      <NextSeo title="Works" />

      <Header active="journal" />
      
      <LazyMotion features={domAnimation}>
        <m.main
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <m.article>
            <h1 className="text-3xl md:text-4xl xl:text-5xl mb-4">{title}</h1>
            <Link href="/journal"><a className="inline-block underline">← Back to all Journal entries</a></Link>

            <div className="content max-w-3xl mb-4 mt-4 md:mt-6">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>

              <p>Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
  const paths = await pageService.fetchPaths('journal')
  return {
    paths: paths,
    fallback: false,
  };
}