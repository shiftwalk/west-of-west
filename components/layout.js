import { useRouter } from 'next/router'

export default function Layout({ children, preview }) {
  const router = useRouter()

  return (
    <div className="p-2 pt-24 md:pt-32 xl:pt-40">
      {children}

      { preview && (<div className={'fixed bottom-0 left-0 right-0 w-full p-2 bg-black text-white justify-center flex z-[200] uppercase'}>! Preview Mode Enabled - <a className={'px-1 underline'} href={`/api/exit-preview?currentRoute=${router.route}`}>Click Here To Exit</a> !</div>)}
    </div>
  )
}