/**
 * Create a canvas element
 *
 * @param {Number} height
 * @param {Number} width
 * @return {Element}
 */
function createElement (height, width) {
  const canvas = document.createElement('canvas')
  canvas.setAttribute('height', height)
  canvas.setAttribute('width', width)
  return canvas
}

/**
 * Draws a graph into a canvas
 *
 * @param {Element} canvas
 * @param {Number} height
 * @param {Number} width
 * @param {Array<Number>} data array with numbers from 0 to 1
 */
function drawGraph (canvas, height, width, data) {
  const ctx = canvas.getContext('2d')
  const horizontalSteps = Math.round(width / data.length)

  ctx.beginPath()

  data.forEach((data, index) => {
    if (index === 0) {
      ctx.moveTo(0, Math.round(data * height))
    } else {
      ctx.lineTo(horizontalSteps * index, Math.round(data * height))
    }
  })

  ctx.stroke()
}

/**
 * Creates and populates a graph
 *
 * @param {Number} height
 * @param {Number} width
 * @param {Array<Number>} data array with numbers from 0 to 1
 * @return {Element} a canvas element
 */
export function newGraph (height = 100, width = 100, data = []) {
  const canvas = createElement(height, width)
  drawGraph(canvas, height, width, data.map(point => 1 - point))
  return canvas
}
