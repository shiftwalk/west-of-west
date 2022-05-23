import React from 'react'
import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { fade } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import { ObjViewer } from 'react-obj-viewer'
import dynamic from 'next/dynamic'

const OBJModel = dynamic(
  ()=>import('react-3d-viewer').then((mod) => mod.OBJModel),
  {ssr: false}
)

export default function Dev() {
  return (
    <Layout>
      <NextSeo title="Dev" />

      <Header />
      
      <LazyMotion features={domAnimation}>
        <m.main
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <m.article variants={fade}>
            <h1 className="font-bold text-3xl md:text-4xl xl:text-5xl mb-4">Dev Playground</h1>
            <div className="content max-w-3xl mb-4">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>

              <p>Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              
              <h2 className="font-bold text-xl md:text-2xl xl:text-3xl mb-4 mt-12">.obj Viewer</h2>

              <div className="bg-gray-100 p-3 max-w-[550px]">
                <OBJModel src="/3d/test.obj" />
              </div>
            </div>
          </m.article>
        </m.main>
      </LazyMotion>

      <Footer />
    </Layout>
  )
}
