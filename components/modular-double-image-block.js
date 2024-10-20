import Image from "@/components/image";
import BlockContent from '@sanity/block-content-to-react'

export default function ModularDoubleImageBlock({ image1, image2, text, layout }) {
  let image1Height = 'h-[125vw] md:h-[55vw]';
  let image2Height = 'h-[125vw] md:h-[45vw]';

  return (
    <div className={`grid grid-cols-10 md:grid-rows-1 gap-x-5`}>
      <div className={`col-span-10 md:col-span-5 md:row-start-1 relative overflow-hidden mb-[1px] md:mb-0 ${layout == 'left-aligned' ? 'md:col-start-6' : 'md:col-start-0'} -mx-2 md:-mx-0`}>
        <div className={`w-full relative overflow-hidden mb-0 md:mb-0 ${image1Height} `}>
          <Image
            image={image1}
            focalPoint={image1.hotspot}
            layout="fill"
            videoControls
            widthOverride={1400}
            className={`w-full ${image1Height} inset-0 h-full object-cover object-center`}
          />
        </div>
      </div>
      <div className={`col-span-10 md:col-span-4 md:row-start-1 relative overflow-hidden ${ text ? 'md:mt-[13vw]' : 'md:mt-[25vw]' } ${layout == 'left-aligned' ? 'md:col-start-0' : 'md:col-start-7'} -mx-2 md:-mx-0`}>
        { text && (
          <div className="content w-11/12 mt-3 mb-12 md:mt-0 md:mb-[13vw] max-w-[75%] px-2 md:px-0">
            <BlockContent serializers={{ container: ({ children }) => children }} blocks={text} />
          </div>
        )}

        <div className={`w-full relative overflow-hidden ${image2Height}`}>
          <Image
            image={image2}
            focalPoint={image2.hotspot}
            layout="fill"
            videoControls
            widthOverride={1200}
            className={`w-full ${image2Height} inset-0 h-full object-cover object-center`}
          />
        </div>
      </div>
    </div>
  )
}