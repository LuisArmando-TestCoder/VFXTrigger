export default presetObject => {
  const imagesAmount = 2
  const images = getImages(3, imagesAmount, "./hands/hand (###).svg")
  const resizeStep = 1000
  let frame = 0
  let imageIndex = 0

  return () => {
    frame += resizeStep

    const maxSize = presetObject.c.width * 4.5
    const size = frame % maxSize

    if (size < resizeStep) imageIndex = ++imageIndex % imagesAmount

    presetObject.clear(imageIndex ? "black" : "white")
    presetObject
      .render({
        x: presetObject.c.width / 2 - size / 2,
        y: presetObject.c.height / 2 - size / 2,
        width: size,
        height: size,
        rotation: frame / resizeStep,
        image: images[imageIndex],
      })
      .image()
  }
}

function getImages(start, amount, srcTemplate) {
  return [...new Array(amount)].map((_, index) => {
    const image = new Image()

    image.src = srcTemplate.replace(/###/g, String(index + start))

    return image
  })
}
