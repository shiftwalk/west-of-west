import Image from "@/components/image";
import BlockContent from '@sanity/block-content-to-react'

export default function ModularTripleImageBlock({ image1, image2, image3, text, layout }) {
  let image1Height = 'h-[70vw] md:h-[40vw]';
  let image2Height = 'h-[70vw] md:h-[30vw]';
  let image3Height = 'h-[70vw] md:h-[38vw] xl:h-[40vw]';

  return (
    <div className={`flex flex-wrap items-start ${layout == 'right-aligned' ? 'flex-row-reverse' : ''}`}>
      <div className={`w-full md:w-[47.25vw] xl:w-[48.75vw] relative overflow-hidden mb-8 md:mb-0 md:mt-[15vw]`}>
        <div className={`w-full md:w-[78%] relative overflow-hidden mb-4 md:mb-0 ${layout == 'right-aligned' ? 'ml-auto' : 'mr-auto'}`}>
          <Image
            image={image1}
            focalPoint={image1.hotspot}
            layout="fill"
            widthOverride={1400}
            className={`w-full ${image1Height} inset-0 h-full object-cover object-center`}
          />
        </div>

        { text && (
          <div className="mt-8 md:mt-[10vw] flex flex-wrap">
            <div className="w-full md:flex-1">
              <span className="block uppercase text-[10px] mb-3 md:mb-0">Heading</span>
            </div>
            <div className={`w-[90%] md:w-[59%] ${layout == 'right-aligned' ? 'md:mr-auto' : 'md:ml-auto'} content`}>
              <BlockContent serializers={{ container: ({ children }) => children }} blocks={text} />
            </div>
          </div>
        )}
      </div>
      <div className={`w-full md:w-[47.25vw] xl:w-[48.25vw] relative overflow-hidden ${layout == 'right-aligned' ? 'mr-auto' : 'ml-auto'}`}>
        <div className={`w-full relative overflow-hidden mb-5 md:mb-[15vw]`}>
          <Image
            image={image2}
            focalPoint={image2.hotspot}
            layout="fill"
            widthOverride={1200}
            className={`w-full ${image2Height} inset-0 h-full object-cover object-center`}
          />
        </div>

        <div className={`w-full md:w-[58%] relative overflow-hidden ${layout == 'right-aligned' ? 'mr-auto' : 'ml-auto'}`}>
          <Image
            image={image3}
            focalPoint={image3.hotspot}
            layout="fill"
            widthOverride={1400}
            className={`w-full ${image3Height} inset-0 h-full object-cover object-center`}
          />
        </div>
      </div>
    </div>
  )
}