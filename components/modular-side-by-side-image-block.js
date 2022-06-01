import Image from "@/components/image";

export default function ModularSideBySideImageBlock({ image1, image2 }) {
  return (
    <div className={`grid grid-cols-10 gap-5`}>
      <div className="col-span-10 md:col-span-8 gap-5 md:col-start-2 grid grid-cols-8">
        <div className={`col-span-4 md:col-span-4 relative overflow-hidden mb-8 md:mb-0`}>
          <Image
            image={image1}
            focalPoint={image1.hotspot}
            layout="fill"
            widthOverride={1400}
            className={`w-full h-[70vw] md:h-[53vw] inset-0 object-cover object-center`}
          />
        </div>
        <div className={`col-span-4 md:col-span-4 relative overflow-hidden mb-8 md:mb-0`}>
          <Image
            image={image2}
            focalPoint={image2.hotspot}
            layout="fill"
            widthOverride={1400}
            className={`w-full h-[70vw] md:h-[53vw] inset-0 object-cover object-center`}
          />
        </div>
      </div>
    </div>
  )
}