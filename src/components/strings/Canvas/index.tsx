import React, { useEffect, useRef, useState } from 'react'
import preset from 'canvas-preset'
import declareVFXKeys from './declareVFXKeys'
import './styles.scss'

export default ({
	className = '',
	id
}: {
	className?: string
	id: string
}) => {
	const canvasRef = useRef(null)

	useEffect(() => {
		const presetObject = preset()
		  
		presetObject.size()

		  const triggerVFX = declareVFXKeys(presetObject)

		  presetObject.draw(() => {
			triggerVFX()
		  })
	}, [])

	return (
		<canvas ref={canvasRef} id={id} className={`canvas ${className}`}/>
	)
}