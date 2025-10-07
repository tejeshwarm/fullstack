import React from 'react'

const Link = ({ to, children, className = '' }) => (
  <a href={`#${to}`} className={className}>{children}</a>
)

export default Link
