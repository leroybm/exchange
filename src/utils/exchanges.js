import apiMock from '../assets/apiMock.json'

/**
 * @typedef Exchange
 * @property {Number} id
 * @property {String} name
 * @property {Number} value
 * @property {Number} variation
 * @property {Array<Number>} dataPoints
 * @property {Array<Number>} normalizedDataPoints
 */

/**
 * @constant {String} API_KEY api access key
 */
const API_KEY = '2997417b'

/**
 * Gets data to populate dashboard from hgbrasil's finance api.
 * If this breaks loads data from a mock api response, for development puposes.
 *
 * @returns {Promise}
 */
function getDataFromApi () {
  return new Promise(resolve => {
    fetch(`https://api.hgbrasil.com/finance?format=json-cors&key=${API_KEY}`)
      .then(response => response.json())
      .then(data => resolve(apiMock))
      .catch(() => resolve(apiMock))
  })
}

/**
 * Translates the api response, as well as merging old data
 *
 * @param {*} apiResponse
 * @param {*} previousExchanges
 * @returns {Array<Exchange>}
 */
function reduceDataToExchanges (apiResponse, previousExchanges) {
  const results = apiResponse && apiResponse.results

  if (!(results && results.currencies && results.bitcoin)) {
    return []
  }

  return Object.values({ ...results.currencies, ...results.bitcoin })
    .filter(exchange => typeof (exchange) === 'object')
    .map((exchange, index) => {
      let value = exchange.buy || exchange.last || 0
      const previousDataPoints = previousExchanges && previousExchanges[index] && previousExchanges[index].dataPoints
      const dataPoints = makeDataPoints(previousDataPoints, value)

      return {
        id: index,
        name: exchange.name || '',
        value: value,
        variation: exchange.variation || 0,
        dataPoints: dataPoints,
        normalizedDataPoints: normalizeData(dataPoints)
      }
    })
}

/**
 * Normalizes an array of numbers to be between 0 and 1
 *
 * @param {Array<Number>} data
 * @returns {Array<Number>}
 */
function normalizeData (data) {
  const valueMin = Math.min(...data)
  const valueMax = Math.max(...data)

  return data.map(value => (value - valueMin) / (valueMax - valueMin))
}

/**
 * Makes a history of cotation data, trims when ther's more than 10 entries
 *
 * @param {Array<Number>} dataPoints - Data points from the last cotations
 * @param {Number} value - Value from the current cotation
 * @returns {Array<Number>}
 */
function makeDataPoints (dataPoints, value) {
  dataPoints = Array.isArray(dataPoints) ? dataPoints : []

  dataPoints.push(value)

  if (dataPoints.length >= 10) {
    dataPoints.shift()
  }

  return dataPoints
}

/**
 * Get exchanges results and filters data to be only results and currency
 */
function getExchanges (previousExchanges) {
  return getDataFromApi()
    .then(data => reduceDataToExchanges(data, previousExchanges))
}

export {
  getExchanges
}
