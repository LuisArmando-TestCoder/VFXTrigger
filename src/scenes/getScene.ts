export function getScenes(scenesNames: string[]): Promise<Function[]> {
    const scenes = []

    return new Promise((resolve, reject) => {
        scenesNames.forEach(async (scenesName) => {
            try { 
                const scene = await getScene(scenesName)

                scenes.push(scene as never)

                if (scenes.length === scenesNames.length) {
                    resolve(scenes)
                }
            } catch (error) {
                reject(error)
            }
        })
    })
}

export default function getScene(sceneName: string): Promise<Function> {
    return new Promise((resolve, reject) => {
        for (const folder in threeJSImports) {
            const threeJSScenes: ThreeJSImport[] = threeJSImports[folder]
            for (const threeJSScene of threeJSScenes) {
                if (sceneName === threeJSScene.name) {
                    import(`../scenes/${folder}/${sceneName}`)
                    .then(scene => resolve(scene.default))
                    .catch(reject)

                    return
                }

            }
        }

        reject(new Error(`${sceneName} doesn't exists`))
    })
}