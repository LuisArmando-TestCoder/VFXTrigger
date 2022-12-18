export default presetObject => {
  const imagesAmount = 9
  const images = getImages(1, imagesAmount, "./camera/camera (###).png")
  const resizeStep = 400
  let frame = 0
  let imageIndex = 0

  return () => {
    frame += resizeStep

    const maxSize = presetObject.c.width
    // const size = frame % maxSize
    const size = presetObject.c.width

    // if (size < resizeStep) imageIndex = ++imageIndex % imagesAmount
    if (frame % size < resizeStep) imageIndex = ++imageIndex % imagesAmount

    const height = images[imageIndex].height / images[imageIndex].width * size

    presetObject
      .render({
        x: presetObject.c.width / 2 - size / 2,
        y: presetObject.c.height / 2 - height / 2,
        width: size,
        height,
        // rotation: frame / resizeStep,
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
