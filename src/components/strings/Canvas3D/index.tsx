import React, { useEffect } from 'react'
import callScenes3D from './callScenes3D'
import './styles.scss'

const Component = ({ scenes, className = '', id }: {
    scenes: string[]
    id: string
    className?: string
}) => {
    useEffect(() => callScenes3D(scenes, id), [])

    return (
        <div className={`canvas3d ${className}`}>
			<canvas id={id}/>
		</div>
    )
}

export default Component