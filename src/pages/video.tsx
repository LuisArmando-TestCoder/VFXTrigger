import React, { useRef, useEffect } from 'react'
import * as Components from '../components'

const videos = [
]

export default () => {
    return (
        <Components.strings.GlobalWrapper title="video">
            {
                videos.map(href => {
                    const videoRef = useRef(null)
                
                    useEffect(() => {
                        const video = videoRef.current as unknown as HTMLVideoElement
                        video.addEventListener("click", () => {
                            video.play()
                        })
                    }, [])

                    return <a href={`#${href}`} key={href}>
                        <video id={href} ref={videoRef} src={href} loop style={{
                            width: "100vw",
                            height: "100vh",
                            margin: 0,
                            padding: 0,
                            display: "block"
                        }}/>
                    </a>
                })
            }
        </Components.strings.GlobalWrapper>
    )
}
