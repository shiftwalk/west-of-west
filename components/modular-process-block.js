import Image from "@/components/image";
import { useState } from "react";

export default function ModularProcessBlock({ images }) {

  const [currentHero, setCurrentHero] = useState(0);

  let width = '(min-width: 768px) 80vw, 100vw'
  let cols = 'col-span-10 md:col-span-6'
  let start = 'md:col-start-3'

  return (
    <div className={`grid grid-cols-10 gap-5`}>
      <div className={`${cols} ${start}`}>
        <div className="h-[60vw] md:h-[40vw] relative overflow-hidden">
          <Image
            image={images[currentHero]}
            focalPoint={images[currentHero].hotspot}
            layout="fill"
            sizes={width}
            className="w-full block gray absolute inset-0 h-full"
          />
        </div>

        {images.length > 1 && (
          <div className="flex flex-wrap mt-0 md:mt-3">
            {images.map((e, i) => {
              return (
                <button key={i} className={`w-[85px] md:w-[100px] mr-2 md:px-0 md:mr-3 mt-2 md:mt-0 md:mb-5 border-none outline-none block h-[55px] md:h-[65px]`} onClick={() => setCurrentHero(i)}>
                  <div className="relative overflow-hidden w-full h-full">
                    <Image
                      image={e}
                      focalPoint={e.asset.hotspot}
                      layout="fill"
                      priority
                      widthOverride={350}
                      className={`block gray absolute inset-0 h-full w-full ${currentHero !== i && 'grayscale opacity-40' }`}
                      noCaption
                    />
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}