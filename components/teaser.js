import Image from "@/components/image";

export default function Teaser({ height, image, isActive, position, external, preload }) {
  return(
    <div className={`mb-3 relative overflow-hidden ${height} cursor-none`}>
      <Image
        image={image}
        focalPoint={image.hotspot}
        layout="fill"
        widthOverride={1000}
        priority={preload ? preload : false}
        className={`w-full inset-0 h-full object-cover object-center`}
      />
      
      { external ? (
        <div className="bg-black bg-opacity-40 flex items-center justify-center absolute inset-0 z-10 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity ease-in-out duration-[250ms]">
          <svg className={`w-10 absolute pointer-events-none text-white ${isActive ? 'opacity-100' : 'opacity-0'}`} style={{ top: position.y - 20, left: position.x - 20 }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z"/></svg>
        </div>
      ) : (
        <div className="bg-black bg-opacity-40 flex items-center justify-center absolute inset-0 z-10 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity ease-in-out duration-[250ms]">
          <svg className={`w-10 absolute pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0'}`} style={{ top: position.y - 20, left: position.x - 20 }} viewBox="0 0 34 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke="#fff" strokeWidth="2" d="M34 17.903H0M16.822 35.002V.998"/></svg>
        </div>
      )}
    </div>
  )
}