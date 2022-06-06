import Clock from 'react-live-clock'

export default function Footer({ noPad }) {
  return (
    <footer className={`border-t border-gray border-opacity-30 pt-12 md:pt-20 xl:pt-28 lg:text-lg ${noPad ? '' : 'mt-12 md:mt-20 xl:mt-28' }`}>
      <div className="grid grid-cols-10 gap-5">
        <div className="mb-5 md:mb-0 flex items-end w-full md:w-auto col-span-10 md:col-auto">
          <div className="relative flex overflow-x-hidden text-xs w-full md:w-auto">
            <div className="animate-marquee whitespace-nowrap">
              <span className="mx-[3px] leading-tight uppercase">Quality above all else</span>
              <span className="mx-[3px] leading-tight uppercase">—</span>
              <span className="mx-[3px] leading-tight uppercase">Practise takes practise</span>
              <span className="mx-[3px] leading-tight uppercase">—</span>
              <span className="mx-[3px] leading-tight uppercase">Quality above all else</span>
              <span className="mx-[3px] leading-tight uppercase">—</span>
              <span className="mx-[3px] leading-tight uppercase">Practise takes practise</span>
              <span className="mx-[3px] leading-tight uppercase">—</span>
              <span className="mx-[3px] leading-tight uppercase">Quality above all else</span>
              <span className="mx-[3px] leading-tight uppercase">—</span>
            </div>

            <div className="absolute top-0 animate-marquee2 whitespace-nowrap">
              <span className="mx-[3px] leading-tight uppercase">Quality above all else</span>
              <span className="mx-[3px] leading-tight uppercase">—</span>
              <span className="mx-[3px] leading-tight uppercase">Practise takes practise</span>
              <span className="mx-[3px] leading-tight uppercase">—</span>
              <span className="mx-[3px] leading-tight uppercase">Quality above all else</span>
              <span className="mx-[3px] leading-tight uppercase">—</span>
              <span className="mx-[3px] leading-tight uppercase">Practise takes practise</span>
              <span className="mx-[3px] leading-tight uppercase">—</span>
              <span className="mx-[3px] leading-tight uppercase">Quality above all else</span>
              <span className="mx-[3px] leading-tight uppercase">—</span>
            </div>
          </div>
        </div>
        
        <div className="md:col-start-3 col-span-10 md:col-span-2 mb-5 md:mb-0 flex items-end">
          <div className="w-full">
            <address className="not-italic leading-tight">
              Portland<br/>
              110 SE Main St,<br/>
              Suite 3000<br/>
              Portland, OR. 97214
            </address>

            <span className="flex leading-tight mt-2 space-x-[6px]">
              <svg className="w-[14px]" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6.5" cy="6.5" r="6" stroke="#333"/><path stroke="#333" d="M6.5 3v4M6 6.5h4"/></svg>
              <span className="tabular-nums"><Clock format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} /> PST</span>
            </span>
          </div>
        </div>
        <div className="md:col-start-5 col-span-10 md:col-span-2 mb-5 md:mb-0 flex justify-end">
          <div className="w-full">
            <address className="not-italic leading-tight">
              Los Angeles<br/>
              970 N Broadway<br/>
              Suite 206<br/>
              Los Angeles, CA. 90012
            </address>

            <span className="flex leading-tight mt-2 space-x-[6px]">
              <svg className="w-[14px]" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6.5" cy="6.5" r="6" stroke="#333"/><path stroke="#333" d="M6.5 3v4M6 6.5h4"/></svg>
              <span className="tabular-nums"><Clock format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} /> PST</span>
            </span>
          </div>
        </div>

        <div className="md:col-start-7 col-span-10 md:col-span-2 mb-5 md:mb-0 flex items-end">
          <div>
            <div>
              <a className="inline-block mb-[-6px] leading-tight group relative overflow-hidden" href="#">
                <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-[400ms] delay-[50ms]">971-266-1001</span>
                <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-[400ms] delay-[50ms]">971-266-1001</span>
                <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
              </a>
            </div>
            <div>
              <a className="inline-block leading-tight group relative overflow-hidden mb-[-5px]" href="#">
                <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-[400ms] delay-[50ms]">info@westofwest.com</span>
                <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-[400ms] delay-[50ms]">info@westofwest.com</span>
                <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
              </a>
            </div>
          </div>
        </div>

        <div className="md:col-start-9 col-span-10 md:col-span-2 mb-5 md:mb-0 flex items-end md:justify-end md:text-right">
          <div>
            <span className="flex items-center w-full leading-tight space-x-1 md:justify-end">
              <span className="block">Site by</span>
              <a href="https://shiftwalk.studio" target="_blank" rel="noopener noreferrer" className="block relative overflow-hidden group">
                <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-[400ms] delay-[50ms]">ShiftWalk</span>
                <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-[400ms] delay-[50ms]">ShiftWalk</span>
                <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
              </a>
            </span>
            <span className="block w-full leading-tight">© West of West<span className="inline md:hidden lg:inline">&nbsp;— 2022</span></span>
          </div>
        </div>
      </div>
    </footer>
  )
}