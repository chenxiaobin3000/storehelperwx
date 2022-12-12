import baseUrl from './api'

const pre = 'account/'
const login = baseUrl + pre + 'login'
const logout = baseUrl + pre + 'logout'

module.exports = {
  login,
  logout
}