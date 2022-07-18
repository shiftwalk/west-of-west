import Image from "@/components/image";

export default function ModularSideBySideImageBlock({ image1, image2 }) {
  return (
    <div className={`grid grid-cols-10 gap-x-5`}>
      <div className="col-span-10 md:col-span-8 gap-x-5 md:col-start-2 grid grid-cols-8 -mx-2 md:-mx-0">
        <div className={`col-span-10 md:col-span-4 relative overflow-hidden md:mb-0 mb-[1px]`}>
          <Image
            image={image1}
            focalPoint={image1.hotspot}
            layout="fill"
            sizes={'(min-width: 768px) 50vw, 100vw'}
            className={`w-full h-[125vw] md:h-[53vw] inset-0 object-cover object-center`}
          />
        </div>
        <div className={`col-span-10 md:col-span-4 relative overflow-hidden md:mb-0`}>
          <Image
            image={image2}
            focalPoint={image2.hotspot}
            layout="fill"
            sizes={'(min-width: 768px) 50vw, 100vw'}
            className={`w-full h-[125vw] md:h-[53vw] inset-0 object-cover object-center`}
          />
        </div>
      </div>
    </div>
  )
}