export default ({ render }: { render? }) => {
  let circleSlices = 5 // 2 to 100
  const getCenter = () => ({
    x: window.innerWidth / 2 + Math.sin(new Date().getMilliseconds() / 1.1),
    y: window.innerHeight / 2 + Math.cos(new Date().getMilliseconds() / 1.1),
  })

  return () => {
    circleSlices = (circleSlices + 1) % 30

    render({
      ...getCenter(),
      color: "#fff",
      thickness: 1.5,
      rotation: new Date().getMilliseconds() / 10,
      scale: circleSlices / 7,
      group: getCircleSlicesGroupCoordinates(2 + circleSlices),
    }).lines()
  }
}

function getCircleSlicesGroupCoordinates(circleSlices, distance = 100) {
  return [...new Array(circleSlices).keys(), 0].map(index => ({
    x:
      Math.sin(((index + 1) / circleSlices) * (Math.PI * 2)) * distance +
      distance,
    y:
      Math.cos(((index + 1) / circleSlices) * (Math.PI * 2)) * distance +
      distance,
  }))
}
