import React from "react"
import * as shaders from "../../shaders"
import { GlobalWrapper, Canvas3D } from "../../components/strings"

export default () => {
  return (
    <GlobalWrapper title='Scenes | Home'>
      <Canvas3D id="home"/>
    </GlobalWrapper>
  )
}
