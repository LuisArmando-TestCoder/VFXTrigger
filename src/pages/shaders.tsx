import React from "react"
import * as shaders from "../shaders"
import { GlobalWrapper } from "../components/strings"

export default () => {
  return (
    <GlobalWrapper title='shaders'>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat( auto-fit, minmax(250px, 1fr) )",
          gridGap: 10,
          margin: "auto",
          width: "clamp(280px, 100%, 780px)",
          padding: "100px 0",
        }}
      >
        {Object.keys(shaders).map(key => {
          const path = `/shaders/${key}`
          return (
            <a
              href={path}
              key={key}
              style={{
                margin: 0,
                padding: 0,
                display: "inline-flex",
              }}
            >
              <iframe
                style={{
                  margin: 0,
                  border: 0,
                  pointerEvents: "none",
                  width: "100%",
                }}
                src={path}
              />
            </a>
          )
        })}
      </div>
    </GlobalWrapper>
  )
}
