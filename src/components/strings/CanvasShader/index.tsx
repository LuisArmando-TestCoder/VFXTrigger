import React, { useEffect } from "react"
import "./styles.scss"

const getFragmentShader = fragmentShader => `
precision mediump float;

uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;

${
  fragmentShader ||
  `
void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
	vec2 st = fragCoord.xy / iResolution.xy;
	fragColor = vec4(st, 0.0, 1.0);
}
`
}

void main() 
{
	mainImage( gl_FragColor, gl_FragCoord.xy );
}
`

const vertexShader = `
attribute vec2 inPos;

void main() 
{
    gl_Position = vec4(inPos, 0.0, 1.0);
}
`

export default ({ className = "", fragmentShader = "", id = "ogl-canvas" }) => {
  useEffect(loadScene(getFragmentShader(fragmentShader), id), [])

  return (
    <div className={`canvasshader ${className}`}>
      <canvas id={id}/>
    </div>
  )
}

// by https://stackoverflow.com/users/5577765/rabbid76
function loadScene(fragmentShader: string, id: string) {
  var canvas,
    gl,
    viewport,
    bufferObject: { [index: string]: any } = {},
    mousePosition = [0, 0],
	progDraw

  function initScene() {
    canvas = document.getElementById(id)
    gl = canvas.getContext("experimental-webgl")
    if (!gl) return

    canvas.addEventListener("mousemove", e => {
      mousePosition = [e.clientX, e.clientY]
    })

    progDraw = gl.createProgram()
    for (let i = 0; i < 2; ++i) {
      let source = 
        i == 0 ? vertexShader : fragmentShader
      let shaderObj = gl.createShader(
        i == 0 ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER
      )
      gl.shaderSource(shaderObj, source)
      gl.compileShader(shaderObj)
      let status = gl.getShaderParameter(shaderObj, gl.COMPILE_STATUS)
      if (!status) alert(gl.getShaderInfoLog(shaderObj))
      gl.attachShader(progDraw, shaderObj)
      gl.linkProgram(progDraw)
    }
    status = gl.getProgramParameter(progDraw, gl.LINK_STATUS)
    if (!status) alert(gl.getProgramInfoLog(progDraw))
    progDraw.inPos = gl.getAttribLocation(progDraw, "inPos")
    progDraw.iTime = gl.getUniformLocation(progDraw, "iTime")
    progDraw.iMouse = gl.getUniformLocation(progDraw, "iMouse")
    progDraw.iResolution = gl.getUniformLocation(progDraw, "iResolution")
    gl.useProgram(progDraw)

    var pos = [-1, -1, 1, -1, 1, 1, -1, 1]
    var inx = [0, 1, 2, 0, 2, 3]

    bufferObject.pos = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferObject.pos)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW)
    bufferObject.inx = gl.createBuffer()
    bufferObject.inx.len = inx.length
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferObject.inx)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(inx), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(progDraw.inPos)
    gl.vertexAttribPointer(progDraw.inPos, 2, gl.FLOAT, false, 0, 0)

    gl.enable(gl.DEPTH_TEST)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    window.onresize = resize
    resize()
    requestAnimationFrame(render)
  }

  function resize() {
    //viewport = [gl.drawingBufferWidth, gl.drawingBufferHeight];
    viewport = [window.innerWidth, window.innerHeight]
    //viewport = [256, 256]
    canvas.width = viewport[0]
    canvas.height = viewport[1]
  }

  function render(deltaMS) {
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    gl.uniform1f(progDraw.iTime, deltaMS / 1000.0)
    gl.uniform2f(progDraw.iResolution, canvas.width, canvas.height)
    gl.uniform2f(progDraw.iMouse, mousePosition[0], mousePosition[1])
    gl.drawElements(gl.TRIANGLES, bufferObject.inx.len, gl.UNSIGNED_SHORT, 0)

    requestAnimationFrame(render)
  }

  return () => initScene()
}
