export default presetObject => {
  const getGlobalConfig = () => ({
    sky: {
      color: '#fff',
      x: () => presetObject.c.width / 2,
      y: () => -presetObject.c.height / 4,
      maxRadius: 1,
      starsAmount: 750,
      rotor: {
        direction: -1,
        speedResistance: 42,
      },
    },
  })

  const sky = createSky(getGlobalConfig, presetObject)

  console.log(sky.stars)
  return () => {
    presetObject.renderGroup("arc", sky.stars, sky.updateStar)
  }
}

function degreesToRadians(degrees) {
  return (degrees / 360) * (Math.PI * 2)
}

function createSky(getGlobalConfig, presetObject) {
  const globalConfig = getGlobalConfig.call(presetObject)
  const getRandomWidth = () => presetObject.random(presetObject.c.width)
  const getRandomHeight = () => presetObject.random(globalConfig.sky.y())
  const getX = (step, randomWidth) =>
    globalConfig.sky.x() + Math.sin(step) * randomWidth
  const getY = (step, randomWidth) =>
    globalConfig.sky.y() + Math.cos(step) * randomWidth

  function getStar(index) {
    const { starsAmount } = this
    const step = degreesToRadians((360 / starsAmount) * index)
    const randomWidth = getRandomWidth()
    const randomHeight = getRandomHeight()
    const x = getX(step, randomWidth)
    const y = getY(step, randomWidth)
    const radius = presetObject.random(globalConfig.sky.maxRadius) + 1

    return {
      x,
      y,
      radius,
      step,
      index,
      randomWidth,
      randomHeight,
      color: globalConfig.sky.color,
    }
  }

  function createStars(
    starsAmount
  ): {
    x: number
    y: number
    r: number
    step: number
    index: number
    randomWidth: number
    randomHeight: number
    color: string
  }[] {
    return [...new Array(starsAmount).keys()].map(
      getStar.bind({
        starsAmount,
      })
    )
  }

  function updateStar(star) {
    star.step += degreesToRadians(
      ((star.radius * 2) / globalConfig.sky.rotor.speedResistance) *
        globalConfig.sky.rotor.direction
    )
    star.x = getX(star.step, star.randomWidth)
    star.y = getY(star.step, star.randomWidth)
  }

  const stars = createStars(globalConfig.sky.starsAmount)

  return {
    stars,
    updateStar,
  }
}
