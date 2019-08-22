/**
 * @constant {Number} SESSION_TIMEOUT - Time to timeout session
 */
const SESSION_TIMEOUT = 1000 * 60 * 6

/**
 * @alias {Storage} window.localStorage
 */
const localStorage = window.localStorage

/**
 * Sets a session time limit
 */
function setSessionTimeLimit () {
  localStorage.setItem('exchangeSessionTime', Date.now() + SESSION_TIMEOUT)
}

/**
 * Stores a username and password to localStorage
 *
 * @param {String} username - User name to be registred
 * @param {String} password - Password to be registred
 * @returns {Boolean}
 */
function register (username, password) {
  localStorage.setItem('exchangeUsername', username)
  localStorage.setItem('exchangePassword', password)
  setSessionTimeLimit()
  return true
}

/**
 * Tries to login via localStorage given a username and password
 *
 * @param {String} username - User name to be used as login
 * @param {String} password - Password to be used as login
 * @returns {Boolean}
 */
function login (username, password) {
  if (
    localStorage.getItem('exchangeUsername') === username &&
    localStorage.getItem('exchangePassword') === password
  ) {
    setSessionTimeLimit()
    return true
  }
}

/**
 * Verify if session has timeout out
 *
 * @returns {Boolean}
 */
function hasSessionTimedout () {
  return Number.parseInt(localStorage.getItem('exchangeSessionTime')) < Date.now()
}

export {
  hasSessionTimedout,
  register,
  login
}
