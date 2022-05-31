import Img from 'next/image'
import sanity from '@/services/sanity'
import { useNextSanityImage } from 'next-sanity-image'

export default function Image({ image, layout, widthOverride, heightOverride, focalPoint, className, priority, noCaption }) {
  // Pass in custom URL builder props
  const myCustomImageBuilder = (imageUrlBuilder, options) => {
    return imageUrlBuilder
      .width((widthOverride ? widthOverride : options.width) || Math.min(( widthOverride ? widthOverride : options.originalImageDimensions.width), 800))
      .quality(90)
      .fit('clip')
  };
  
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

	return (
    <figure className={`image ${className} ${layout == 'fill' && 'cover-image' }`}>
		  <Img {...imageProps} {...attributes} />
      
      {(image.caption && !noCaption) && (
        <figcaption className={`text-base md:text-lg leading-snug md:leading-snug ${layout == 'fill' && 'mt-2 -mb-1 py-1 bg-white absolute bottom-0 left-0 w-full z-[10]'}`}>{image.caption}{image.captionSubHeading && (<span className="block text-gray">{image.captionSubHeading}</span>)}</figcaption>
      )}
    </figure>
	)
}