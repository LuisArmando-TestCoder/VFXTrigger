const config = {
  spinningSquareAmount: 30,
  mouseVectorExageration: 1.1,
  colorBurn: 3,
  rings: {
    amount: 80,
    separationScaler: 1.75,
    groupScale: 0.2,
  },
  rotationStep: 2,
  background: "#000",
  warp: {
    centerSlope: 5,
    distanceScale: 10,
  },
  frequencyColorSplitter: 2,
  square: {
    color: "#fff",
    innerRotationForce: 0.1,
  },
}

export default presetObject => {
  const warp = getWarp(config.spinningSquareAmount, config.rings.amount)

  return () => {
    presetObject.renderGroup(
      "rect",
      warp,
      setWarpSquare.bind(presetObject),
      moveRotationStep.bind(presetObject),
      rotateSquare.bind(presetObject)
    )
  }
}

function rotateSquare(square) {
  square.rotation += square.scale * config.square.innerRotationForce
}

function getExageratedMouse({ x, y }) {
  const leg = {
    x: this.c.width / 2 - x,
    y: this.c.height / 2 - y,
  }

  return {
    x:
      this.c.width / 2 -
      Math.sign(leg.x) * Math.abs(leg.x) ** config.mouseVectorExageration,
    y:
      this.c.height / 2 -
      Math.sign(leg.y) * Math.abs(leg.y) ** config.mouseVectorExageration,
  }
}

function setWarpSquare(square) {
  const slope = {
    x: this.c.width / 2,
    y: this.c.height / 2,
  }

  const warpCenter = {
    x:
      this.c.width / 2 +
      (slope.x - this.c.width / 2) /
        (square.distance / config.warp.distanceScale + config.warp.centerSlope),
    y:
      this.c.height / 2 +
      (slope.y - this.c.height / 2) /
        (square.distance / config.warp.distanceScale + config.warp.centerSlope),
  }
  return {
    ...square,
    width: square.scale,
    height: square.scale,
    x: warpCenter.x + Math.sin(square.rotationStep) * square.distance,
    y: warpCenter.y + Math.cos(square.rotationStep) * square.distance,
  }
}

function moveRotationStep(square) {
  square.rotationStep += config.rotationStep / square.distance
}

function getWarp(spinningSquareAmount, ringsAmount) {
  return [...new Array(ringsAmount)]
    .map((_, i) => getRing(spinningSquareAmount, i))
    .flat()
}

function getRing(spinningSquareAmount, ringIndex) {
  return [...new Array(spinningSquareAmount)].map((_, i) => {
    return getSpinningSquare({
      rotationStep: ((Math.PI * 2) / spinningSquareAmount) * i,
      distance: ringIndex ** config.rings.separationScaler,
      scale: ringIndex * config.rings.groupScale,
    })
  })
}

function getSpinningSquare(props = {}) {
  return {
    width: 0,
    height: 0,
    rotation: 0,
    color: config.square.color,
    ...props,
  }
}
