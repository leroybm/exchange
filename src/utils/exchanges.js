import apiMock from '../assets/apiMock.json'

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

function reduceDataToExchanges (apiResponse, previousExchanges) {
  const results = apiResponse && apiResponse.results

  if (!(results && results.currencies && results.bitcoin)) {
    return []
  }

  return Object.values({ ...results.currencies, ...results.bitcoin })
    .filter(exchange => typeof (exchange) === 'object')
    .map((exchange, index) => {
      const value = exchange.buy || exchange.last || 0
      const dataPoints = makeDataPoints(index, value, previousExchanges.dataPoints || [])

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

function normalizeData (data) {
  const valueMin = Math.min(...data)
  const valueMax = Math.max(...data)

  return data.map(value => (value - valueMin) / (valueMax - valueMin))
}

function makeDataPoints (id, value, dataPoints) {
  dataPoints[id] = Array.isArray(dataPoints[id]) ? dataPoints[id] : []
  dataPoints[id].push(value)

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
