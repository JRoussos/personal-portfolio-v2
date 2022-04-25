import React from 'react'
import './anchor-style.scss'

const LinkContent = ({children}) => {
  return (
    <React.Fragment>
      <span>{children}</span>
      <svg width="51" height="51" viewBox="0 0 51 51" fill="none">
          <path d="M40.7988 5.97753H2.43625V0.330078H50.4396V48.3334H44.7921V9.97088L4.43293 50.3301L0.439575 46.3367L40.7988 5.97753Z" fill="white" fillOpacity="0.8"/>
      </svg>
    </React.Fragment>
  )
}

const Link = ({ children, href, as='a', className=''}) =>
  React.createElement(as, {className: `link-wrapper ${className}`, href: href}, <LinkContent children={children}/>)

export default Link