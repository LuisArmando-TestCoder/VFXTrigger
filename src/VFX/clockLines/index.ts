export default presetObject => {
  const linesAmount = 250
  const linesScale = 100
  const itemsToIterate = [...new Array(linesAmount)]

  return () => {
    itemsToIterate.forEach((_, index) => {
      presetObject
        .render({
          x: presetObject.c.width / 2,
          y: presetObject.c.height / 2,
          thickness: 2,
          color: "#fff",
          rotation:
            (index / linesAmount) *
            360 *
            getNoise({
              step: index * (Date.now() / 1e5),
            }),
          group: [
            { x: 0, y: 0 },
            {
              x: 0,
              y:
                linesScale *
                getNoise({
                  step: index * (Date.now() / 1e7),
                }),
            },
          ],
        })
        .lines()
    })
  }
}

function getNoise({
  step,
  max = 10,
  min = 0,
  precision = 200,
  yScale = 1,
  ease = 17,
}) {
  const noise =
    getWaveRandom(step / (precision * ease)) * (yScale * ease) +
    getWaveRandom(step / precision) * yScale +
    (getWaveRandom(step / ease) * yScale) / ease
  const scaledNoise = (noise / (yScale * ease)) * (max - min) + min

  return scaledNoise
}

function getWaveRandom(n) {
  return Math.sin(2 * n) + Math.sin(Math.PI * n)
}
