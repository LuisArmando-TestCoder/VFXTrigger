import React from 'react'
import * as Components from '../components'
import * as shaders from '../shaders'

export default ({ pageContext: { slug } }) => {
  return (
    <Components.strings.CanvasShader 
        id={slug}
        fragmentShader={shaders[slug]}
    />
  )
}