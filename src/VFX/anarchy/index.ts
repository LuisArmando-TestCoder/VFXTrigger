export default presetObject => {
  const anarchyImage = new Image()

  anarchyImage.src = `./anarchy/anarchy (0).png`

  let frame = 0
  const distance = 10

  return () => {
    const size = presetObject.c.width / 4

    presetObject.render({
      x: presetObject.c.width / 2 - size / 2 + Math.sin(Math.random() * frame) * distance,
      y: presetObject.c.height / 2 - size / 2 + Math.cos(Math.random() * frame) * distance,
      width: size,
      height: size,
      color: '#44f',
      rotation: 0,
      image: anarchyImage
    }).image()

    frame += 0.5
  }
}
