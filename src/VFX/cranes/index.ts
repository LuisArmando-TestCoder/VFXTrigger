export default presetObject => {
  const cranesAmount = 9

  const craneImages = [...new Array(cranesAmount)].map((_, index) => {
    const craneImage = new Image()

    craneImage.src = `./cranes/cranes (${index + 1}).png`

    return craneImage
  })

  let frame = 0

  console.log(craneImages)

  return () => {
    const craneIndex = Math.floor(frame) % cranesAmount
    const size = presetObject.c.width / 2

    presetObject.render({
      x: presetObject.c.width / 2 - size / 2,
      y: presetObject.c.height / 2 - size / 2,
      width: size,
      height: size,
      color: '#44f',
      rotation: 0,
      image: craneImages[craneIndex] 
    }).image()

    frame += 0.25
  }
}
