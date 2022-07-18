import Image from "@/components/image";

export default function ModularImageBlock({ image, layout }) {

  let cols = 'col-span-10';
  let start = 'col-start-0'
  let width = '(min-width: 768px) 90vw, 100vw'

  if (layout == 'left-aligned') {
    width = '(min-width: 768px) 90vw, 100vw'
    cols = 'col-span-10 md:col-span-7'
    start = 'col-start-0'
  }
  if (layout == 'full-bleed') {
    width = '(min-width: 768px) 100vw, 100vw'
    cols = 'col-span-10'
    start = 'col-start-0'
  }
  if (layout == 'left-aligned-portrait') {
    width = '(min-width: 768px) 90vw, 100vw'
    cols = 'col-span-10 md:col-span-4'
    start = 'col-start-0'
  }
  if (layout == 'centered') {
    width = '(min-width: 768px) 100vw, 100vw'
    cols = 'col-span-10 md:col-span-6'
    start = 'md:col-start-3'
  }
  if (layout == 'centered-portrait') {
    width = '(min-width: 768px) 90vw, 100vw'
    cols = 'col-span-10 md:col-span-4'
    start = 'col-start-0 md:col-start-4'
  }
  if (layout == 'right-aligned') {
    width = '(min-width: 768px) 70vw, 100vw'
    cols = 'col-span-10 md:col-span-7'
    start = 'md:col-start-4'
  }
  if (layout == 'right-aligned-portrait') {
    width = '(min-width: 768px) 90vw, 100vw'
    cols = 'col-span-10 md:col-span-4'
    start = 'col-start-0 md:col-start-7'
  }
  if (layout == 'contained-square') {
    width = '(min-width: 768px) 70vw, 100vw'
    cols = 'col-span-10 md:col-span-5'
    start = 'md:col-start-3'
  }

  return (
    <div className={`grid grid-cols-10 gap-5 ${layout == 'full-bleed' ? '-mx-2 md:-mx-2' : '-mx-2 md:-mx-0' }`}>
      <div className={`${cols} ${start}`}>
        <Image
          image={image}
          focalPoint={image.hotspot}
          layout="responsive"
          sizes={width}
          className="w-full"
        />
      </div>
    </div>
  )
}