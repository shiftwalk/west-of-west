import BlockContentWrapper from '@/components/block-content-wrapper'
import ModularImageBlock from '@/components/modular-image-block'
import ModularTextBlock from '@/components/modular-text-block'
import modularDoubleImageBlock from '@/components/modular-double-image-block'
import modularTripleImageBlock from '@/components/modular-triple-image-block'

const notImplemented = ({ type }) => <h1>Not implemented {type}</h1>

const bodySerializers = {
  block: {
    component: BlockContentWrapper,
    wrapper: ({ children }) => 
      <div className="mb-20 md:mb-32 xl:mb-52">
        {children}
      </div>
  },
  modularImageBlock: {
    component: ModularImageBlock,
    wrapper: ({ children }) => 
      <div className="mb-20 md:mb-32 xl:mb-52">
        {children}
      </div>
  },
  textBlock: {
    component: ModularTextBlock,
    wrapper: ({ children }) => 
      <div className="mb-20 md:mb-32 xl:mb-52">
        {children}
      </div>
  },
  modularDoubleImageBlock: {
    component: modularDoubleImageBlock,
    wrapper: ({ children }) => 
      <div className="mb-20 md:mb-32 xl:mb-52">
        {children}
      </div>
  },
  modularTripleImageBlock: {
    component: modularTripleImageBlock,
    wrapper: ({ children }) => 
      <div className="mb-20 md:mb-32 xl:mb-52">
        {children}
      </div>
  }
}

function getSerializers() {
  const res = {}
  for (const [key, value] of Object.entries(bodySerializers)) {
    if (key === 'block') continue
    const Component = value.component
    res[key] = (props) => <Component {...props.node} />
  }
  return res
}

export const blockSerializers = getSerializers()

const BodyRenderer = ({ body }) => {
  if (!body) return <></>
  return body.map((item) => {
    const type = item._type
    const serializer = bodySerializers[type]
    const Component = serializer?.component
    const args = serializer?.args
    const Wrapper = serializer?.wrapper

    if (!Component || !serializer) throw new Error(`No serializer implemented for body object: ${type}`)    
    
    return Wrapper ? <Wrapper key={item._key}><Component {...item} {...args} /></Wrapper> : <Component key={item._key} {...item} {...args} />
  })
}

export default BodyRenderer;