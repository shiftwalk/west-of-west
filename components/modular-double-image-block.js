import Image from "@/components/image";
import BlockContent from '@sanity/block-content-to-react'

export default function ModularDoubleImageBlock({ image1, image2, text, layout }) {
  let image1Height = 'h-[70vw] md:h-[60vw]';
  let image2Height = 'h-[70vw] md:h-[45vw]';

  return (
    <div className={`flex flex-wrap items-end md:pb-[30vw] xl:pb-[20vw] ${layout == 'left-aligned' ? 'flex-row-reverse' : ''}`}>
      <div className={`w-full md:w-[47.25vw] xl:w-[48.75vw] relative overflow-hidden mb-8 md:mb-0`}>
        <div className={`w-full relative overflow-hidden`}>
          <Image
            image={image1}
            focalPoint={image1.hotspot}
            layout="fill"
            widthOverride={1400}
            className={`w-full ${image1Height} inset-0 h-full object-cover object-center`}
          />
        </div>
      </div>
      <div className={`w-full md:w-[37.25vw] xl:w-[38.75vw] relative overflow-hidden md:mb-[-30vw] xl:mb-[-20vw] ${layout == 'left-aligned' ? 'mr-auto' : 'ml-auto'}`}>
        { text && (
          <div className="content w-11/12 mb-8 md:mb-24 xl:mb-32 max-w-xl">
            <BlockContent serializers={{ container: ({ children }) => children }} blocks={text} />
          </div>
        )}

        <div className={`w-full relative overflow-hidden`}>
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