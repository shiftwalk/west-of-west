import { useEffect, useRef, useState } from "react";
import Image from "@/components/image";

export default function InteractiveImage({ height, images, width, isActive, position, autoplay, deviceType, isMobile }) {
  const ref = useRef(null);
  const [relativeWidth, setRelativeWidth] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    setRelativeWidth(ref.current.offsetWidth)
  }, []);

  useEffect(() => {
    // Set an interval that updates the currentProject every 3 seconds on mobile to rotate the projects
    if (autoplay || isMobile) {
      const i_id = setInterval(() => {
        if (currentImage == (images.length - 1)) {
          // If we hit the cap (5)... Reset...
          setCurrentImage(0)
        } else {
          // Else... Tick along...
          setCurrentImage(currentImage => currentImage+1)
        }
      }, isMobile ? 1000 : 500);
      return () => {
        clearInterval(i_id);
      }
    }
  },[currentImage]);


  const updateImages = () => {
    if (position.x < (relativeWidth / images.length)) {
      setCurrentImage(0)
    }
    else if (position.x < (relativeWidth / images.length * 2)) {
      setCurrentImage(1)
    }
    else if (position.x < (relativeWidth / images.length * 3)) {
      setCurrentImage(2)
    }
    else if (position.x < (relativeWidth / images.length * 4)) {
      setCurrentImage(3)
    }
    else if (position.x < (relativeWidth / images.length * 5)) {
      setCurrentImage(4)
    }
    else if (position.x < (relativeWidth / images.length * 6)) {
      setCurrentImage(5)
    }
    else if (position.x < (relativeWidth / images.length * 7)) {
      setCurrentImage(6)
    }
    else if (position.x < (relativeWidth / images.length * 8)) {
      setCurrentImage(7)
    }
  }

  return(
      <div className="group block">
        <div className={`mb-3 relative overflow-hidden ${height} ${ autoplay ? '' : 'cursor-none'}`} onMouseMove={ autoplay ? null : updateImages}>
          {images.map((e, i) => {
            return (
              <div ref={ref} className={`${i == 0 ? 'relative' : 'absolute inset-0' } ${i == currentImage ? 'z-[10]' : 'z-[1] opacity-0' }`}>
                <Image
                  noBg
                  image={e}
                  focalPoint={e.hotspot}
                  layout="responsive"
                  widthOverride={width}
                  noCaption
                  className="w-full"
                />
                {(e.caption) && (
                  <div className={`mt-2 ${i == currentImage ? 'opacity-100' : 'opacity-0' }`}>
                    <figcaption className={`text-base md:text-lg xl:text-xl leading-tight xl:leading-tight md:leading-tight`}>{e.caption}{e.captionSubHeading && (<span className="block text-gray">{e.captionSubHeading}</span>)}</figcaption>
                  </div>
                )}
              </div>
            )
          })}
          
          {!autoplay && (
            <div className="flex items-center justify-center absolute inset-0 z-[10] opacity-0 group-hover:opacity-100 group-focus:opacity-100"> 
              <svg className={`w-10 absolute pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0'}`} style={{ top: position.y - 20, left: position.x - 20 }} viewBox="0 0 34 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke="#fff" strokeWidth="2" d="M34 17.903H0M16.822 35.002V.998"/></svg>
            </div>
          )}
        </div>
      </div>
  )
}