const boidShape = [
  { x: 14, y: 20 },
  { x: 29, y: 0 },
  { x: 14.5, y: 42.5 },
  { x: 0, y: 0 },
  { x: 15, y: 20 }
]

const maxDegrees = 360
const timeScale = 1
const radians = Math.PI * 2
const maxDistance = 499

let time = 0

export default (presetObject) => {
  const boids = getBoids.call(presetObject, 500, maxDistance)

  return () => {
    time += timeScale
    presetObject.renderGroup('lines', boids, setDrawableBoid.bind(presetObject))
  }
}

function setDrawableBoid(boid) {
  const spin = (boid.mileage + time / (boid.far / 100)) / maxDegrees * radians
  boid.x = Math.sin(spin) * boid.far + this.c.width / 2
  boid.y = Math.cos(spin) * boid.far + this.c.height / 2
  boid.color = '#fff'
  boid.thickness = 2
  boid.group = boidShape
  boid.scale = 1 / boid.far  
  boid.rotation = spin / -radians * maxDegrees + -90
}

// boid getBoids({amount | positions})
function getBoids(amount, maxDistance) {
  return (
    [...new Array(amount)]
  ).map(() => ({
    mileage: this.random(maxDegrees),
    far: this.random(maxDistance / 2, 10),
    rotation: 0,
  }))
}