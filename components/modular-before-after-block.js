import Image from "@/components/image";
import { useEffect, useState } from "react";
import ReactCursorPosition from "react-cursor-position";
import { Pixelify } from "react-pixelify";
import BeforeAfterImage from "./before-after-image";

let timeout = null;
let beforeTimeout = null;
let afterTimeout = null;
let myBeforeCounter = 0;
let myAfterCounter = 0;

export default function ModularBeforeAfterBlock({ beforeImage, afterImage, layout, pixelate }) {
  const [currentState, setCurrentState] = useState('after')
  const [beforePixelAmount, setBeforePixelAmount] = useState(100)
  const [afterPixelAmount, setAfterPixelAmount] = useState(20)
  
  useEffect(()=> {
    return ()=> clearInterval(timeout);
  }, []);

  myBeforeCounter = beforePixelAmount;

  // const beforeDown = () => {
  //   beforeTimeout = setInterval(() => {
  //     setBeforePixelAmount(prevBeforePixelAmount => prevBeforePixelAmount - 20)
  //     if(myBeforeCounter === 20) clearInterval(beforeTimeout);

  //   }, 450);
  // };

  myAfterCounter = afterPixelAmount;

  const after = () => {
    setCurrentState('before')
    afterTimeout = setInterval(() => {
      setAfterPixelAmount(prevAfterPixelAmount => prevAfterPixelAmount + 20)
      if(myAfterCounter === 100) clearInterval(afterTimeout);
    }, 200);
    
    beforeTimeout = setInterval(() => {
      setBeforePixelAmount(prevBeforePixelAmount => prevBeforePixelAmount - 20)
      if(myBeforeCounter === 20) clearInterval(beforeTimeout);

    }, 200);
  };

  const before = () => {
    setCurrentState('after')

    beforeTimeout = setInterval(() => {
      setBeforePixelAmount(prevBeforePixelAmount => prevBeforePixelAmount + 20)
      if(myBeforeCounter === 100) clearInterval(beforeTimeout);

    }, 200);

    afterTimeout = setInterval(() => {
      setAfterPixelAmount(prevAfterPixelAmount => prevAfterPixelAmount - 20)
      if(myAfterCounter === 20) clearInterval(afterTimeout);
    }, 200);
  };

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

  return pixelate ? (
    <div className={`grid grid-cols-10 gap-5 ${layout == 'full-bleed' && '-mx-2' }`}>
      <div className={`${cols} ${start} relative overflow-hidden`}>
        <div className={`relative ${ beforePixelAmount == 20 ? 'z-20' : 'z-0' }`}>
          <div className={`absolute inset-0 w-full h-full z-10  ${ beforePixelAmount == 20 ? 'opacity-0' : 'opacity-100' }`}>
            <Pixelify
              src={beforeImage.asset.metadata.lqip}
              pixelSize={beforePixelAmount}
              width={beforeImage.asset.metadata.dimensions.width}
              height={beforeImage.asset.metadata.dimensions.height}
            />
          </div>

          <Image
            image={beforeImage}
            focalPoint={beforeImage.hotspot}
            layout="responsive"
            widthOverride={width}
            className="w-full"
          />
        </div>
        <div className={`absolute inset-0  ml-[%] overflow-hidden ${ afterPixelAmount == 100 ? 'z-0' : 'z-20' }`}>
          <div className={`absolute inset-0 w-full h-full z-10 ${ afterPixelAmount == 20 ? 'opacity-0' : 'opacity-100' }`}>
            <Pixelify
              src={afterImage.asset.metadata.lqip}
              pixelSize={afterPixelAmount}
              width={afterImage.asset.metadata.dimensions.width}
              height={afterImage.asset.metadata.dimensions.width}
            />
          </div>
          <Image
            image={afterImage}
            focalPoint={afterImage.hotspot}
            layout="fill"
            widthOverride={width}
            className="w-full inset-0 absolute"
          />
        </div>
      </div>

      <div className="col-span-6 col-start-3">
        {currentState == 'after' ? (
          <button onClick={after}>After</button>
        ) : (
          <button onClick={before}>Before</button>
        )}
      </div>
    </div>
  ) : (
    <div className={`grid grid-cols-10 gap-5 ${layout == 'full-bleed' && '-mx-2' }`}>
      <div className={`${cols} ${start} relative overflow-hidden`}>
        <ReactCursorPosition>
          <BeforeAfterImage
            beforeImage={beforeImage}
            afterImage={afterImage}
            width={width}
          ></BeforeAfterImage>
        </ReactCursorPosition>
      </div>
    </div>
  )
}