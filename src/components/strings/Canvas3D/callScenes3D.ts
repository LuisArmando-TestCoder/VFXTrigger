import * as scenes3D from '../../../scenes'

export default (sceneNames: string[], id: string) => {
    for (const sceneName of sceneNames) {
        scenes3D.default[sceneName](id)
    }
}