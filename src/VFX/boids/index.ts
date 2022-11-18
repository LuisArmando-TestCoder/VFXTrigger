const boidShape = [
  { x: 14, y: 20 },
  { x: 29, y: 0 },
  { x: 14.5, y: 42.5 },
  { x: 0, y: 0 },
  { x: 15, y: 20 },
]

const maxDegrees = 360
const maxRadians = -Math.PI * 2
const maxAcceleration = 3
const maxSpeed = 3
const accelerationReduction = 100
const boidsPerception = 100

export default presetObject => {
  const boids = getBoids.call(presetObject, 350)

  return () => {
    presetObject.renderGroup(
      "lines",
      boids,
      boid => setBoidLocalGroup.call(presetObject, boid, boids),
      applyBoidForces.bind(presetObject),
      moveBoid.bind(presetObject),
      boundBoids.bind(presetObject)
    )
  }
}

function boundBoids(boid) {
  if (
    boid.x > this.c.width ||
    boid.y > this.c.height ||
    boid.x < 0 ||
    boid.y < 0
  ) {
    boid.x = this.c.width / 2
    boid.y = this.c.height / 2
  }
}

function applyBoidForces(boid) {
  if (boid.local.amount) {
    setAlignment.call(this, boid)
    setCohesion.call(this, boid)
    setSeparation.call(this, boid)
  }
}

function moveBoid(boid) {
  boid.speed =
    Math.abs(boid.speed + boid.acceleration) < maxSpeed
      ? boid.speed + boid.acceleration
      : boid.speed
  boid.x += Math.sin((boid.rotation / maxDegrees) * maxRadians) * boid.speed
  boid.y += Math.cos((boid.rotation / maxDegrees) * maxRadians) * boid.speed
  boid.acceleration = 0
}

// boid getBoids(amount)
function getBoids(amount) {
  return [...new Array(amount)].map(() => ({
    x: this.random(this.c.width),
    y: this.random(this.c.height),
    speed: Math.random(),
    acceleration: Math.random() / accelerationReduction,
    rotation: this.random(360),
    group: boidShape,
    fill: "#fff",
    scale: 0.25,
    local: {},
  }))
}

function setBoidLocalGroup(boid, boids) {
  // reset
  boid.local.x = 0
  boid.local.y = 0
  boid.local.rotation = 0
  boid.local.speed = 0
  boid.local.acceleration = 0
  boid.local.amount = 0

  // summations
  boids.forEach(passingBoid => {
    const isBoidVisible =
      this.get2DVerticesDistance(passingBoid, boid) < boidsPerception
    const isBoidNotHimself = boid !== passingBoid
    const canAddBoidInGroup = isBoidVisible && isBoidNotHimself
    if (canAddBoidInGroup) {
      boid.local.x += passingBoid.x
      boid.local.y += passingBoid.y
      boid.local.rotation += passingBoid.rotation
      boid.local.speed += passingBoid.speed
      boid.local.acceleration += passingBoid.acceleration
      boid.local.amount++
    }
  })

  // averages
  boid.local.x /= boid.local.amount
  boid.local.y /= boid.local.amount
  boid.local.rotation /= boid.local.amount
  boid.local.speed /= boid.local.amount
  boid.local.acceleration /= boid.local.amount
}

function setCohesion(boid) {
  // write on notebook
  // set cohesion
  const cohesion = boid.x * boid.y - boid.local.x * boid.local.y
  const toCohese = -cohesion / (maxDegrees * maxRadians)
  boid.rotation += toCohese
}

function setAlignment(boid) {
  const newRotation =
    (boid.rotation + (boid.rotation + boid.local.rotation) / 2) / 2
  const rotationsDifference =
    (Math.abs(newRotation - boid.rotation) / maxDegrees) * maxAcceleration

  // when the rotations difference is very big the acceleration of the boid that enters the group gets decreased
  boid.acceleration = Math.abs(
    (boid.speed + (boid.speed + boid.local.speed) / 2) / 2 - rotationsDifference
  )
  boid.rotation = newRotation
}

function setSeparation(boid) {
  // play with acceleration
  const scaleDotDirection =
    (boid.local.x * boid.local.y - boid.x * boid.y) /
    (this.c.width * this.c.height)
  const separation =
    getSmoothInverseDirectionalDistance(scaleDotDirection) / (maxDegrees / 2)
  const newAcceleration =
    (boid.acceleration * (Math.abs(separation) / maxSpeed)) / maxSpeed
  boid.acceleration -= newAcceleration
  boid.rotation += separation
}

function getSmoothInverseDirectionalDistance(
  x,
  height = 90,
  width = boidsPerception
) {
  const i = 1 / x ** 2
  const b = -(1 / width ** 2 / i ** 2 - 1)
  const d = height * Math.max(0, b ** 2 * b)

  return d * Math.sign(x)
}
