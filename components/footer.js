import { useEffect, useRef } from 'react';
import Clock from 'react-live-clock'
import { DateTime } from "luxon";

export default function Footer({ noPad }) {
  const wowSecondHandle = useRef(null);
  const wowMinuteHandle = useRef(null);
  const wowHourHandle = useRef(null);
  const wowSecondHandle2 = useRef(null);
  const wowMinuteHandle2 = useRef(null);
  const wowHourHandle2 = useRef(null);
  const userSecondHandle = useRef(null);
  const userMinuteHandle = useRef(null);
  const userHourHandle = useRef(null);
  const userSecondHandle2 = useRef(null);
  const userMinuteHandle2 = useRef(null);
  const userHourHandle2 = useRef(null);

  let wowDateStamp = DateTime.local({ zone: "America/Los_Angeles" }).toFormat('ZZZZ')
  let userDateStamp = DateTime.local().toFormat('ZZZZ')

  useEffect(() => {
    let wowDate = DateTime.local({ zone: "America/Los_Angeles" });
    let userDate = DateTime.local();

    let wowSs = wowDate.second;
    let wowMm = wowDate.minute;
    let wowHh = wowDate.hour;
    
    let userSs = userDate.second;
    let userMm = userDate.minute;
    let userHh = userDate.hour;

    wowSecondHandle.current.style.transform = `rotateZ(${wowSs * 6}deg)`;
    wowMinuteHandle.current.style.transform = `rotateZ(${wowMm * 6}deg)`;
    wowHourHandle.current.style.transform = `rotateZ(${wowHh * 30}deg)`;

    wowSecondHandle2.current.style.transform = `rotateZ(${wowSs * 6}deg)`;
    wowMinuteHandle2.current.style.transform = `rotateZ(${wowMm * 6}deg)`;
    wowHourHandle2.current.style.transform = `rotateZ(${wowHh * 30}deg)`;
    
    userSecondHandle.current.style.transform = `rotateZ(${userSs * 6}deg)`;
    userMinuteHandle.current.style.transform = `rotateZ(${userMm * 6}deg)`;
    userHourHandle.current.style.transform = `rotateZ(${userHh * 30}deg)`;

    userSecondHandle2.current.style.transform = `rotateZ(${userSs * 6}deg)`;
    userMinuteHandle2.current.style.transform = `rotateZ(${userMm * 6}deg)`;
    userHourHandle2.current.style.transform = `rotateZ(${userHh * 30}deg)`;
  }, []);

  return (
    <footer className={`border-t border-gray border-opacity-30 pt-12 md:pt-20 xl:pt-28 lg:text-lg ${noPad ? '' : 'mt-12 md:mt-20 xl:mt-28' }`}>
      <div className="grid grid-cols-10 gap-5">
        <div className="mb-5 md:mb-0 flex items-end w-full md:w-auto col-span-10 md:col-auto">
          <div className="relative flex overflow-x-hidden text-xs w-full md:w-auto">
            <div className="animate-marquee whitespace-nowrap">
              <span className="mx-[3px] leading-tight uppercase">Quality above all else</span>
              <span className="mx-[3px] leading-tight uppercase">—</span>
              <span className="mx-[3px] leading-tight uppercase">Practice takes practise</span>
              <span className="mx-[3px] leading-tight uppercase">—</span>
              <span className="mx-[3px] leading-tight uppercase">Quality above all else</span>
              <span className="mx-[3px] leading-tight uppercase">—</span>
              <span className="mx-[3px] leading-tight uppercase">Practice takes practise</span>
              <span className="mx-[3px] leading-tight uppercase">—</span>
              <span className="mx-[3px] leading-tight uppercase">Quality above all else</span>
              <span className="mx-[3px] leading-tight uppercase">—</span>
            </div>

            <div className="absolute top-0 animate-marquee2 whitespace-nowrap">
              <span className="mx-[3px] leading-tight uppercase">Quality above all else</span>
              <span className="mx-[3px] leading-tight uppercase">—</span>
              <span className="mx-[3px] leading-tight uppercase">Practice takes practise</span>
              <span className="mx-[3px] leading-tight uppercase">—</span>
              <span className="mx-[3px] leading-tight uppercase">Quality above all else</span>
              <span className="mx-[3px] leading-tight uppercase">—</span>
              <span className="mx-[3px] leading-tight uppercase">Practice takes practise</span>
              <span className="mx-[3px] leading-tight uppercase">—</span>
              <span className="mx-[3px] leading-tight uppercase">Quality above all else</span>
              <span className="mx-[3px] leading-tight uppercase">—</span>
            </div>
          </div>
        </div>
        
        <div className="md:col-start-3 col-span-10 md:col-span-2 mb-5 md:mb-0 flex items-end">
          <div className="w-full group">
            <address className="not-italic text-base leading-[1.15] xl:text-xl xl:leading-[1.15]">
              Portland<br/>
              110 SE Main St,<br/>
              Suite 3000<br/>
              Portland, OR. 97214
            </address>

            <div className="relative">
              <span className="flex text-base leading-[1.15] xl:text-xl xl:leading-[1.15] mt-2 space-x-[6px] opacity-100 group-hover:opacity-0">
                <div className="clock-container">
                  <div className="clock">
                    <div ref={wowHourHandle} className="hor" id="hor">
                      <div className="hr"></div>
                    </div>
                    <div ref={wowMinuteHandle} className="min" id="min">
                      <div className="mn"></div>
                    </div>
                    <div ref={wowSecondHandle} className="sec opacity-10" id="sec">
                      <div className="sc"></div>
                    </div>
                  </div>
                </div>
                
                <span className="tabular-nums"><Clock format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} /> {wowDateStamp}</span>
              </span>

              <span className="flex text-base leading-[1.15] xl:text-xl xl:leading-[1.15] space-x-[6px] absolute inset-0 opacity-0 group-hover:opacity-100">
                <div className="clock-container">
                  <div className="clock">
                    <div ref={userHourHandle} className="hor" id="hor">
                      <div className="hr"></div>
                    </div>
                    <div ref={userMinuteHandle} className="min" id="min">
                      <div className="mn"></div>
                    </div>
                    <div ref={userSecondHandle} className="sec opacity-10" id="sec">
                      <div className="sc"></div>
                    </div>
                  </div>
                </div>
                
                <span className="tabular-nums"><Clock format={'HH:mm:ss'} ticking={true} /> {userDateStamp}</span>
              </span>
            </div>
          </div>
        </div>
        <div className="md:col-start-5 col-span-10 md:col-span-2 mb-5 md:mb-0 flex justify-end group">
          <div className="w-full">
            <address className="not-italic text-base leading-[1.15] xl:text-xl xl:leading-[1.15]">
              Los Angeles<br/>
              970 N Broadway<br/>
              Suite 206<br/>
              Los Angeles, CA. 90012
            </address>

            <div className="relative">
              <span className="flex text-base leading-[1.15] xl:text-xl xl:leading-[1.15] mt-2 space-x-[6px] opacity-100 group-hover:opacity-0">
                <div className="clock-container">
                  <div className="clock">
                    <div ref={wowHourHandle2} className="hor" id="hor">
                      <div className="hr"></div>
                    </div>
                    <div ref={wowMinuteHandle2} className="min" id="min">
                      <div className="mn"></div>
                    </div>
                    <div ref={wowSecondHandle2} className="sec opacity-10" id="sec">
                      <div className="sc"></div>
                    </div>
                  </div>
                </div>
                
                <span className="tabular-nums"><Clock format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} /> {wowDateStamp}</span>
              </span>

              <span className="flex text-base leading-[1.15] xl:text-xl xl:leading-[1.15] space-x-[6px] absolute inset-0 opacity-0 group-hover:opacity-100 ">
                <div className="clock-container">
                  <div className="clock">
                    <div ref={userHourHandle2} className="hor" id="hor">
                      <div className="hr"></div>
                    </div>
                    <div ref={userMinuteHandle2} className="min" id="min">
                      <div className="mn"></div>
                    </div>
                    <div ref={userSecondHandle2} className="sec opacity-10" id="sec">
                      <div className="sc"></div>
                    </div>
                  </div>
                </div>
                
                <span className="tabular-nums"><Clock format={'HH:mm:ss'} ticking={true} /> {userDateStamp}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="md:col-start-7 col-span-10 md:col-span-2 mb-5 md:mb-0 flex items-end">
          <div>
            <div>
              <a className="inline-block mb-[-6px] text-base leading-[1.15] xl:text-xl xl:leading-[1.15] group relative overflow-hidden" href="#">
                <span className="block">971-266-1001</span>
                <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
              </a>
            </div>
            <div>
              <a className="inline-block text-base leading-[1.15] xl:text-xl xl:leading-[1.15] group relative overflow-hidden mb-[-5px]" href="#">
                <span className="block">info@westofwest.com</span>
                <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
              </a>
            </div>
          </div>
        </div>

        <div className="md:col-start-9 col-span-10 md:col-span-2 mb-5 md:mb-0 flex items-end md:justify-end md:text-right">
          <div>
            <span className="flex items-center w-full text-base leading-[1.15] xl:text-xl xl:leading-[1.15] space-x-1 md:justify-end">
              <span className="block">Site by</span>
              <a href="https://shiftwalk.studio" target="_blank" rel="noopener noreferrer" className="block relative overflow-hidden group">
                <span className="block">ShiftWalk</span>
                <span className="w-full group-hover:w-0 group-focus:w-0 transition-all ease-in-out duration-300 h-[1px] bg-black absolute bottom-0 left-0 right-0"></span>
              </a>
            </span>
            <span className="block w-full text-base leading-[1.15] xl:text-xl xl:leading-[1.15]">© West of West<span className="inline md:hidden lg:inline">&nbsp;— 2022</span></span>
          </div>
        </div>
      </div>
    </footer>
  )
}