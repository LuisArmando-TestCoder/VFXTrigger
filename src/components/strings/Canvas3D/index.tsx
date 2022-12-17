import React, {useEffect} from 'react'
import presetScene, {  } from 'scene-preset'
import './styles.scss'

export default ({
	className = '',
	id,
}) => {
	useEffect(() => {
		presetScene([
			console.log
		], `#${id}`)
	}, [])

	return (
		<canvas id={id} className={`canvas3d ${className}`}/>
	)
}