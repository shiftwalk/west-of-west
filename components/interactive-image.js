import { useEffect, useRef, useState } from "react";
import Image from "@/components/image";

export default function InteractiveImage({ height, images, width, isActive, position, autoplay, deviceType, isMobile, crossfade, layout }) {
  const ref = useRef(null);
  const [relativeWidth, setRelativeWidth] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    setRelativeWidth(ref.current.offsetWidth)
  }, []);

  useEffect(() => {
    let speed = 500

    if (isMobile) {
      speed = 1000
    }

    if (crossfade) {
      speed = 1750
    }
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
      }, speed);
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
        <div className={`mb-3 relative overflow-hidden ${height} ${ autoplay ? '' : 'cursor-crosshair'} ${layout == 'full-bleed' ? '' : '-mx-2' }`} onMouseMove={ autoplay ? null : updateImages}>
          {images.map((e, i) => {
            return (
              <div ref={ref} className={`${crossfade ? 'transition-opacity duration-500 ease-in-out' : '' } ${i == 0 ? 'relative' : 'absolute inset-0' } ${i == currentImage ? 'z-[10]' : 'z-[1] opacity-0' }`}>
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
                  <div className={`mt-2 md:px-3 ${crossfade ? 'transition-opacity duration-500 ease-in-out' : '' } ${i == currentImage ? 'opacity-100' : 'opacity-0' } px-2 md:px-0`}>
                    <figcaption className={`block text-lg leading-none xl:leading-[1.15] xl:text-xl`}>{e.caption}{e.captionSubHeading && (<span className="block text-gray">{e.captionSubHeading}</span>)}</figcaption>
                  </div>
                )}
              </div>
            )
          })}

        </div>
      </div>
  )
}