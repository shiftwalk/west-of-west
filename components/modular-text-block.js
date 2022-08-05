import BlockContent from '@sanity/block-content-to-react'

export default function ModularTextBlock({ text, layout }) {

  let cols = 'col-span-10';
  let start = 'col-start-0'

  if (layout == 'left-aligned') {
    cols = 'col-span-8 md:col-span-3'
    start = 'col-start-0 md:col-start-1'
  }
  if (layout == 'right-aligned') {
    cols = 'col-span-8 md:col-span-3'
    start = 'col-start-0 md:col-start-6'
  }
  if (layout == 'center-aligned') {
    cols = 'col-span-8 md:col-span-3'
    start = 'col-start-0 md:col-start-4'
  }

  return (
    <div className="grid grid-cols-9 pt-3 pb-12 md:pt-0 md:pb-0">
      <div className={`content ${cols} ${start}`}>
        <BlockContent serializers={{ container: ({ children }) => children }} blocks={text} />
      </div>
    </div>
  )
}