import '@/styles/main.css'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import Link from 'next/link'
import SEO from '@/helpers/seo.config';

export default function App({ Component, pageProps }) {
  const router = useRouter()

  return (
    <>
      <DefaultSeo {...SEO} /> 

      <div className="fixed bottom-0 right-0 m-3">
        <Link href="/dev-sandbox">
          <a className="block bg-black text-white px-3 py-2 uppercase leading-none font-mono">
            Dev Sandbox
          </a>
        </Link>
      </div>

      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </>
  )
}