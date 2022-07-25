import Image from "@/components/image";
import BlockContent from '@sanity/block-content-to-react'

export default function ModularDoubleLandscapeImageBlock({ image1, image2, layout }) {
  let image1Height = 'h-[50vw] md:h-[33vw]';
  let image2Height = 'h-[50vw] md:h-[24vw]';

  return (
    <div className={`grid grid-cols-10 md:grid-rows-1 gap-x-5`}>
      <div className={`col-span-10 md:col-span-5 md:row-start-1 relative overflow-hidden mb-[1px] md:mb-0 ${layout == 'right-aligned' ? 'md:col-start-6 md:mt-[12vw]' : 'md:col-start-0'} -mx-2 md:-mx-0`}>
        <div className={`w-full relative overflow-hidden mb-0 md:mb-0 ${image1Height} `}>
          <Image
            image={image1}
            focalPoint={image1.hotspot}
            layout="fill"
            widthOverride={1400}
            className={`w-full ${image1Height} inset-0 h-full object-cover object-center`}
          />
        </div>
      </div>
      <div className={`col-span-10 md:col-span-4 md:row-start-1 relative overflow-hidden ${layout == 'right-aligned' ? 'md:col-start-0' : 'md:col-start-7 md:mt-[18vw]'} -mx-2 md:-mx-0`}>
        <div className={`w-full relative overflow-hidden ${image2Height}`}>
          <Image
            image={image2}
            focalPoint={image2.hotspot}
            layout="fill"
            widthOverride={1200}
            className={`w-full ${image2Height} inset-0 h-full object-cover object-center`}
          />
        </div>
      </div>
    </div>
  )
}