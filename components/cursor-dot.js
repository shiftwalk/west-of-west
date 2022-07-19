import Link from 'next/link'

export default function CursorDot( {extraClasses, isActive, position, children} ) {
  return (
    <span className={`block overflow-hidden relative cursor-none ${extraClasses}`}>
      {children}

      <span className="flex items-center justify-center absolute inset-0 z-[100] opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity ease-in-out duration-[250ms]">
        <span className={`block w-[10px] h-[10px] bg-black rounded-full absolute pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0'}`} style={{ top: position.y - 10, left: position.x - 10 }}></span>
      </span>
    </span>
  )
}