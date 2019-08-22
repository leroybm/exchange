import apiMock from '../assets/apiMock.json'

const API_KEY = '2997417b'

/**
 * Gets data to populate dashboard from hgbrasil's finance api.
 * If this breaks loads data from a mock api response, for development puposes.
 *
 * @returns {Promise}
 */
function getExchangesFromApi () {
  return new Promise(resolve => {
    fetch(`https://api.hgbrasil.com/finance?format=json-cors&key=${API_KEY}`)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(() => resolve(apiMock))
  })
}

/**
 * Get  exchanges results and filters data to be only results and currency
 */
function getExchanges () {
  return getExchangesFromApi()
    .then(finance => {
      return Object.values({ ...finance.results.currencies, ...finance.results.bitcoin })
        .filter(finance => typeof (finance) === 'object')
    })
}

export {
  getExchanges
}
