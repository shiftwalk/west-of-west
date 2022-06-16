import { useEffect, useRef, useState } from "react";
import Image from "./image";

export default function BeforeAfterImage({ position, beforeImage, afterImage, width }) {
  const ref = useRef(null);
  const wrapper = useRef(null);
  const [relativeWidth, setRelativeWidth] = useState(0);

  useEffect(() => {
    setRelativeWidth(wrapper.current.offsetWidth)
  }, []);

  const updateImages = () => {
    ref.current.style.marginLeft = `${ (position.x < relativeWidth / 10) ? 10 : position.x / 10}%`
  }

  return(
    <div onMouseMove={updateImages} ref={wrapper}>
      <div className={`relative overflow-hidden`}>
        <Image
          image={beforeImage}
          focalPoint={beforeImage.hotspot}
          layout="responsive"
          widthOverride={width}
          className="w-full"
        />
        <span className="bg-black text-white px-3 py-2 uppercase text-xs absolute bottom-0 left-0 ml-3 mb-3">Before</span>
      </div>
      <div className={`absolute inset-0 w-full h-full ml-[10%]`} ref={ref}>
        <Image
          image={afterImage}
          focalPoint={afterImage.hotspot}
          layout="fill"
          widthOverride={width}
          className="w-full inset-0 absolute"
        />
        <span className="bg-black text-white px-3 py-2 uppercase text-xs absolute bottom-0 left-0 ml-3 mb-3">After</span>
      </div>
    </div>
  )
}