import Image from "@/components/image";

export default function Teaser({ height, image, isActive, position, external, preload }) {
  return(
    <div className={`mb-3 relative overflow-hidden ${height} cursor-none`}>
      <Image
        image={image}
        focalPoint={image.hotspot}
        layout="fill"
        sizes="(min-width: 768px) 33vw, 100vw"
        priority={preload ? preload : false}
        className={`w-full inset-0 h-full object-cover object-center`}
      />
      
      <div className="bg-black bg-opacity-40 flex items-center justify-center absolute inset-0 z-10 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity ease-in-out duration-[250ms]">
        <svg className={`w-10 absolute pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0'}`} style={{ top: position.y - 20, left: position.x - 20 }} viewBox="0 0 34 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke="#fff" strokeWidth="2" d="M34 17.903H0M16.822 35.002V.998"/></svg>
      </div>
    </div>
  )
}