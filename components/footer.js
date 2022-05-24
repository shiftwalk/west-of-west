import Clock from 'react-live-clock'

export default function Footer() {
  return (
    <footer className="border-t border-gray border-opacity-30 mt-12 md:mt-20 xl:mt-28 pt-12 md:pt-20 xl:pt-28 md:text-lg">
      <div className="grid grid-cols-10">
        <div className="md:col-start-3 col-span-10 md:col-span-2 mb-5 md:mb-0">
          <address className="not-italic leading-tight">
            Portland<br/>
            110 SE Main St,<br/>
            Suite 3000<br/>
            Portland, OR. 97214
          </address>

          <span className="flex leading-tight mt-2 space-x-[6px]">
            <svg className="w-[14px]" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6.5" cy="6.5" r="6" stroke="#333"/><path stroke="#333" d="M6.5 3v4M6 6.5h4"/></svg>
            <span className="tabular-nums"><Clock format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} /></span>
          </span>
        </div>
        <div className="md:col-start-5 col-span-10 md:col-span-2 mb-5 md:mb-0">
          <address className="not-italic leading-tight">
            Los Angeles<br/>
            970 N Broadway<br/>
            Suite 206<br/>
            Los Angeles, CA. 90012
          </address>

          <span className="flex leading-tight mt-2 space-x-[6px]">
            <svg className="w-[14px]" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6.5" cy="6.5" r="6" stroke="#333"/><path stroke="#333" d="M6.5 3v4M6 6.5h4"/></svg>
            <span className="tabular-nums"><Clock format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} /></span>
          </span>
        </div>

        <div className="md:col-start-7 col-span-10 md:col-span-2 mb-5 md:mb-0 flex items-end">
          <div>
            <div>
              <a className="inline-block -mb-1 leading-tight group relative overflow-hidden" href="#">
                <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-[400ms] delay-[50ms]">971-266-1001</span>
                <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-[400ms] delay-[50ms]">971-266-1001</span>
                <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
              </a>
            </div>
            <div>
              <a className="inline-block leading-tight group relative overflow-hidden" href="#">
                <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-[400ms] delay-[50ms]">info@westofwest.com</span>
                <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-[400ms] delay-[50ms]">info@westofwest.com</span>
                <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
              </a>
            </div>
          </div>
        </div>

        <div className="md:col-start-9 col-span-10 md:col-span-4 mb-5 md:mb-0 flex items-end md:justify-end md:text-right">
          <div>
            <span className="flex items-center w-full leading-tight space-x-1">
              <span className="block">Site by</span>
              <a href="https://shiftwalk.studio" target="_blank" rel="noopener noreferrer" className="block relative overflow-hidden group">
                <span className="block group-hover:translate-y-full transition-translate ease-in-out duration-[400ms] delay-[50ms]">ShiftWalk</span>
                <span className="block absolute top-0 left-0 right-0 -translate-y-full group-hover:translate-y-0 transition-translate ease-in-out duration-[400ms] delay-[50ms]">ShiftWalk</span>
                <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
              </a>
            </span>
            <span className="block w-full leading-tight">© West of West — 2022</span>
          </div>
        </div>
      </div>
    </footer>
  )
}