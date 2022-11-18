const getTime = () => new Date().getTime()
const initialTime = getTime()
const getColorValue = () =>
  255 - Math.sin((getTime() - initialTime) / 10000) * 255
const getColor = () => `rgb(68, ${getColorValue()}, ${getColorValue()})`
const radius = 1;
const speed = 2;
const viewRadius = 100;
const boundary = 412;

export default presetObject => {
  const boids = getBoids.call(presetObject, 500)

  return () => {
    presetObject.renderGroup(
      "arc",
      boids,
      handleBoidAnimation.bind({...presetObject, boids})
    )
  }
}

function handleBoidAnimation(boid) {
  const updatedBoid = getUpdatedBoid.call(this, boid, this.boids)
  const movedBoid = getMovedBoid.call(this, boid, updatedBoid)
  setBoidBoundary.call(this, movedBoid, boid)
  setBoidMove.call(this, movedBoid, boid)
  boid.color = getColor.call(this)
}

function getBoids(amount) {
  return [...new Array(amount)].map(getBoid.bind(this))
}

function getBoid() {
  const maxDistance = (this.c.height / 2) * 0.75
  const randomSpin = () => Math.PI * 2 * Math.random()
  const fixedRandomSpin = randomSpin()

  return {
    x: Math.sin(fixedRandomSpin) * this.random(maxDistance) + this.c.width / 2,
    y: Math.cos(fixedRandomSpin) * this.random(maxDistance) + this.c.height / 2,
    radius,
    speed,
    direction: randomSpin(),
    color: getColor(),
    viewRadius,
  }
}

function getMovedBoid(boid, updatedBoid) {
  const movedBoid = JSON.parse(JSON.stringify(boid))
  movedBoid.speed = updatedBoid.speed
  movedBoid.direction = updatedBoid.direction
  movedBoid.x += boid.speed * Math.sin(boid.direction)
  movedBoid.y += boid.speed * Math.cos(boid.direction)
  return movedBoid
}

function setBoidMove(movedBoid, boid) {
  boid.speed = movedBoid.speed
  boid.direction = movedBoid.direction
  boid.x = movedBoid.x
  boid.y = movedBoid.y
}

function getUpdatedBoid(boid, boids) {
  const group = getBoidGroup.call(this, boid, boids)
  const havingGroup = group.length
  if (havingGroup) {
    const groupProperties = getGroupProperties(group)
    const averagedGroupProperties = getAveragedGroupProperties(
      groupProperties,
      group.length
    )
    const separatedBoid = getSeparatedBoid.call(
      this,
      boid,
      averagedGroupProperties
    )
    const alignedBoid = getAlignedBoid.call(
      this,
      separatedBoid,
      averagedGroupProperties
    )
    const cohesedBoid = getCohesedBoid.call(
      this,
      alignedBoid,
      averagedGroupProperties
    )

    return cohesedBoid
  }
  return boid
}

function getBoidGroup(boid, boids) {
  const boidGroup = []
  boids.forEach(currentBoid => {
    if (boid !== currentBoid) {
      const distance = this.get2DVerticesDistance(boid, currentBoid)
      const isBoidPartOfGroup = Math.abs(distance) < boid.viewRadius
      if (isBoidPartOfGroup) (boidGroup as any[]).push(currentBoid)
    }
  })
  return boidGroup
}

function getGroupProperties(group) {
  const groupProperties = { direction: 0, speed: 0, position: { x: 0, y: 0 } }
  group.forEach(boid => {
    groupProperties.speed += boid.speed
    groupProperties.direction += boid.direction
    groupProperties.position.x += boid.x
    groupProperties.position.y += boid.y
  })
  return groupProperties
}

function getAveragedGroupProperties(groupProperties, boidsAmount) {
  const stringProperties = JSON.stringify(groupProperties)
  const averagedGroupProperties = JSON.parse(stringProperties)
  averagedGroupProperties.speed /= boidsAmount
  averagedGroupProperties.direction /= boidsAmount
  averagedGroupProperties.position.x /= boidsAmount
  averagedGroupProperties.position.y /= boidsAmount
  return averagedGroupProperties
}

function getSeparatedBoid(boid, averagedGroupProperties) {
  const oppositeVerticesDirection = getOppositeVerticesDirection.call(
    this,
    boid,
    averagedGroupProperties.position
  )
  const separatedBoid = {
    ...boid,
    // direction: (oppositeVerticesDirection * oppositeVerticesDirection.magnitude + boid.direction) / 2
  }
  return separatedBoid
}

function getAlignedBoid(boid, averagedGroupProperties) {
  const alignedBoid = {
    ...boid,
    direction: (averagedGroupProperties.direction + boid.direction) / 2,
  }
  return alignedBoid
}

function getCohesedBoid(boid, averagedGroupProperties) {
  const averageDirection = getVerticesDirection.call(
    this,
    boid,
    averagedGroupProperties.position
  )
  const cohesedBoidVector = {
    ...boid,
    direction: (averageDirection + boid.direction) / 2,
  }
  return cohesedBoidVector
}

function getCenteredVertex() {
  const center = { x: this.c.width / 2, y: this.c.height / 2 }
  return center
}

function setBoidBoundary(movedBoid, boid) {
  const centeredVertex = getCenteredVertex.call(this)
  const distanceFromCenter = this.get2DVerticesDistance(
    centeredVertex,
    movedBoid
  )
  const isOutOfBoundary = Math.abs(distanceFromCenter) >= boundary
  if (isOutOfBoundary) {
    movedBoid.speed = -movedBoid.speed
  }
}

function getVerticesDirection(boid, otherBoid) {
  const hypotenuse = this.get2DVerticesDistance(boid, otherBoid)
  const oppositeLeg = otherBoid.y - boid.y
  const verticesDirection = Math.asin(oppositeLeg / hypotenuse)
  ;(verticesDirection as any).__proto__.magnitude = Math.abs(oppositeLeg)
  return verticesDirection
}

function getOppositeVerticesDirection(boid, otherBoid) {
  const hypotenuse = this.get2DVerticesDistance(boid, otherBoid)
  const adjacentLeg = otherBoid.x - boid.x
  const boundaryDirection = Math.acos(adjacentLeg / hypotenuse)
  const oppositeBoundaryDirection = boundaryDirection + Math.PI / 2
  ;(oppositeBoundaryDirection as any).__proto__.magnitude = Math.abs(
    adjacentLeg
  )
  return oppositeBoundaryDirection
}
