import Img from 'next/image'
import sanity from '@/services/sanity'
import { useNextSanityImage } from 'next-sanity-image'
import { useEffect, useState } from 'react';

export default function Image({ image, layout, widthOverride, heightOverride, focalPoint, className, priority, noCaption, noBg, sizes, nonRelative, double, videoControls }) {
  // Pass in custom URL builder props
  const myCustomImageBuilder = (imageUrlBuilder, options) => {
    return imageUrlBuilder
      .width((widthOverride ? widthOverride : options.width) || Math.min(( widthOverride ? widthOverride : options.originalImageDimensions.width), 800))
      .quality(90)
      .fit('clip')
  };
  const QUERY = '(prefers-reduced-motion: no-preference)';

  function usePrefersReducedMotion() {
    // Default to no-animations, since we don't know what the
    // user's preference is on the server.
    const [
      prefersReducedMotion,
      setPrefersReducedMotion
    ] = useState(false);
    useEffect(() => {
      const mediaQueryList = window.matchMedia(QUERY);
      // Set the true initial value, now that we're on the client:
      setPrefersReducedMotion(
        !window.matchMedia(QUERY).matches
      )
      // Register our event listener
      const listener = (event) => {
        setPrefersReducedMotion(!event.matches);
      };
      mediaQueryList.addEventListener('change', listener);
      return () => {
        mediaQueryList.removeEventListener('change', listener);
      };
    }, []);
    return prefersReducedMotion;
  }

  const shouldReduceMotion = usePrefersReducedMotion();

  
  // Generate actual URL
	const imageProps = useNextSanityImage(sanity.config, image.asset, { imageBuilder: myCustomImageBuilder });

  // Generate attributes for Img component
  const attributes = {};

  if (focalPoint?.x && focalPoint?.y) {
    const { x, y } = focalPoint;
    attributes.objectPosition = `${x * 100}% ${y * 100}%`;
  }

  if (image.alt) { attributes.alt = image.alt } else { attributes.alt = 'MISSING ALT TEXT' }
  if (layout) { attributes.layout = layout } else { attributes.layout = 'responsive' }
  if (priority) { attributes.priority = true } else { attributes.priority = false }
  if (sizes) { attributes.sizes = sizes }

	return (image.overrideVideo || image.overrideVimeoVideo) ? (
    <div className={`image ${className} w-full aspect-video h-full overflow-hidden ${nonRelative ? '' : 'relative'} ${layout == 'fill' && 'cover-image' }`}>
    {shouldReduceMotion ? (
      <video
        loop={true}
        controls={videoControls}
        playsInline={shouldReduceMotion ? false : true}
        muted
        className={`object-cover object-center w-full h-full absolute inset-0`}
      >
        <source src={ image.overrideVimeoVideo ? image.overrideVimeoVideo : image.overrideVideo.asset.url } type="video/mp4" />

        Sorry. Your browser does not support the video tag.
      </video>
    ) : (
      <video
        loop={true}
        autoPlay={"autoplay"} 
        playsInline={true}
        muted
        className={`object-cover object-center w-full h-full absolute inset-0`}
      >
        <source src={ image.overrideVimeoVideo ? image.overrideVimeoVideo : image.overrideVideo.asset.url } type="video/mp4" />

        Sorry. Your browser does not support the video tag.
      </video>
    )}

      {(image.caption && !noCaption) && (
        <span className={`text-base md:text-lg xl:text-xl leading-tight xl:leading-tight md:leading-tight ${layout == 'fill' && 'mt-2 -mb-1 py-2 bg-white absolute bottom-0 left-0 w-full z-[10] '}`}>{image.caption}{image.captionSubHeading && (<span className="block text-gray">{image.captionSubHeading}</span>)}</span>
      )}
    </div>
	) : (
    <figure className={`image ${noBg ? '' : 'bg-white'} bg-opacity-20 ${className} ${layout == 'fill' && 'cover-image' }`}>
		  <Img {...imageProps} {...attributes} />
      
      {(image.caption && !noCaption) && (
        <figcaption className={`block text-lg leading-none xl:leading-[1.15] px-2 md:px-0 xl:text-xl pt-3 pb-8 md:pb-2 md:pt-2 ${layout == 'fill' && 'mt-2 -mb-1 py-2 bg-white absolute bottom-0 left-0 w-full z-[10]'} ${double ? 'translate-y-[35px] md:translate-y-[10px]' : '' }`}>{image.caption}{image.captionSubHeading && (<span className="block text-gray">{image.captionSubHeading}</span>)}</figcaption>
      )}
    </figure>
  )
}
