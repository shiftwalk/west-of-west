import Image from "@/components/image";

export default function ModularImageBlock({ image, layout }) {

  let cols = 'col-span-10';
  let start = 'col-start-0'
  let width = 1600

  if (layout == 'left-aligned') {
    width = 1200
    cols = 'col-span-7'
    start = 'col-start-0'
  }
  if (layout == 'left-aligned-portrait') {
    width = 1200
    cols = 'col-span-5 md:col-span-4'
    start = 'col-start-0'
  }
  if (layout == 'centered') {
    width = 1200
    cols = 'col-span-6'
    start = 'col-start-3'
  }
  if (layout == 'centered-portrait') {
    width = 1200
    cols = 'col-span-6 md:col-span-4'
    start = 'col-start-3 md:col-start-4'
  }
  if (layout == 'right-aligned') {
    width = 900
    cols = 'col-span-7'
    start = 'col-start-4'
  }
  if (layout == 'right-aligned-portrait') {
    width = 1200
    cols = 'col-span-5 md:col-span-4'
    start = 'col-start-6 md:col-start-7'
  }
  if (layout == 'contained-square') {
    width = 900
    cols = 'col-span-5'
    start = 'col-start-3'
  }

  return (
    <div className={`grid grid-cols-10 gap-5 ${layout == 'full-bleed' && '-mx-2' }`}>
      <div className={`${cols} ${start}`}>
        <Image
          image={image}
          focalPoint={image.hotspot}
          layout="responsive"
          widthOverride={width}
          className="w-full"
        />
      </div>
    </div>
  )
}