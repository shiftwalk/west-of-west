import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "./image";

export default function HomeHeroHover({ items, isActive, position }) {
  const ref = useRef(null);
  const [current, setCurrent] = useState(0);

  const updateHero = (e) => {
    setCurrent(e)
  }

  // useEffect(() => {
  //   setRelativeWidth(ref.current.offsetWidth)
  // }, []);

  return(
    <>
      <div className="h-[65vh] md:h-screen w-full sticky top-0">
        <div className="bg-gray bg-opacity-40 w-full h-full relative overflow-hidden">
          <div
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 z-20">
              <div className="absolute inset-0 z-20 flex" ref={ref}>
                {items.map((e, i) => {
                  return (
                    <div className="block flex-1 -none" key={i} onMouseEnter={() => updateHero(i)}></div>
                  )
                })}
              </div>
            
            </div>
            
            {items.map((e, i) => {
              return (
                <>
                  <div className={`absolute inset-0 transition-opacity ease-in-out duration-[250ms] z-[10] ${ i == current ? 'opacity-100' : 'opacity-0' }`} key={i}>
                    <Image
                      image={e.heroImages[0]}
                      focalPoint={e.heroImages[0].asset.hotspot}
                      layout="fill"
                      priority
                      widthOverride={2000}
                      className="w-full h-full absolute inset-0 object-cover object-center"
                      noCaption
                    />
                  </div>
                </>
              )
            })}

          </div>

          <div className="absolute bottom-0 left-0 right-0 grid grid-cols-10 gap-3 md:gap-5 z-[20] p-3 text-white">
            <div className="col-span-2 space-x-2 items-end hidden lg:flex">
              {items.map((e, i) => {
                return (
                  <span className={`block uppercase text-xs ${i == current ? 'opacity-100' : 'opacity-30'}`} key={i}>ww.{e.projectCode}</span>
                )
              })}
            </div>

            <div className="col-span-4 block text-sm md:text-lg xl:text-xl relative leading-none md:leading-none lg:leading-none xl:leading-none ">
              {items[current].title}
            </div>

            <div className="col-span-4 lg:col-span-2 block text-sm md:text-lg xl:text-xl relative leading-none md:leading-none lg:leading-none xl:leading-none ">
              {items[current].locationCity}, {items[current].locationState}
            </div>

            <div className="col-span-2 text-right block text-sm md:text-lg xl:text-xl relative leading-none md:leading-none  xl:leading-none lg:leading-none">
              <Link href="/works">
                <a className="inline-block mb-[-6px] leading-tight group relative overflow-hidden" href="#">
                  <span className="block">All Works</span>
                  <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-white absolute bottom-0 left-0 right-0"></span>
                </a>
              </Link>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent z-[10] p-2 pt-16 opacity-70"></div>
        </div>
      </div>
    </>
  )
}