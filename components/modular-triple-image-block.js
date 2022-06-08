import Image from "@/components/image";
import BlockContent from '@sanity/block-content-to-react'

export default function ModularTripleImageBlock({ image1, image2, image3, text, layout }) {
  let image1Height = 'h-[70vw] md:h-[38.4vw]';
  let image2Height = 'h-[70vw] md:h-[32vw]';
  let image3Height = 'h-[70vw] md:h-[38vw] xl:h-[40vw]';

  return (
    <div className={`grid grid-cols-10 md:grid-rows-1 gap-5`}>
      <div className={`col-span-10 md:row-start-1 relative overflow-hidden mb-8 md:mb-0 md:mt-[15vw] ${layout == 'right-aligned' ? 'md:col-span-6 md:col-start-5' : 'md:col-span-5 md:col-start-1'}`}>

        <div className={`grid gap-5 ${layout == 'right-aligned' ? 'grid-cols-6' : 'grid-cols-5' }`}>
          <div className={`relative overflow-hidden mb-4 md:mb-0 ${layout == 'right-aligned' ? 'col-span-6 md:col-start-3 md:col-span-4' : 'col-span-5 md:col-span-4' }`}>
            <Image
              image={image1}
              focalPoint={image1.hotspot}
              layout="fill"
              widthOverride={1400}
              className={`w-full ${image1Height} inset-0 h-full object-cover object-center`}
            />
          </div>
          
          { text && (
            <div className={`mt-8 md:mt-[12vw] ${layout == 'right-aligned' ? 'col-span-6' : 'col-span-5' }`}>
              <div className={`grid gap-5 ${layout == 'right-aligned' ? 'grid-cols-6' : 'grid-cols-5' }`}>
                <div className={`${layout == 'right-aligned' ? 'md:col-span-1 col-span-6' : 'md:col-span-2 col-span-5' }`}>
                  <span className="block uppercase text-[10px] mb-3 md:mb-0">Heading</span>
                </div>
                <div className={`${layout == 'right-aligned' ? 'col-span-5 md:col-span-3 md:col-start-3' : 'col-span-5 md:col-span-3' } content`}>
                  <BlockContent serializers={{ container: ({ children }) => children }} blocks={text} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={`col-span-10 md:row-start-1 relative overflow-hidden ${layout == 'right-aligned' ? 'md:col-span-4 md:col-start-1' : 'md:col-span-5 md:col-start-6'}`}>
        <div className="grid grid-cols-5 gap-5">
          <div className={`relative overflow-hidden mb-5 md:mb-[15vw] col-span-5`}>
            <Image
              image={image2}
              focalPoint={image2.hotspot}
              layout="fill"
              widthOverride={1200}
              className={`w-full ${image2Height} inset-0 h-full object-cover object-center`}
            />
          </div>

          <div className={`col-span-4 md:col-span-3 ${layout == 'right-aligned' ? 'md:col-start-1' : 'md:col-start-3' } relative overflow-hidden`}>
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
    </div>
  )
}