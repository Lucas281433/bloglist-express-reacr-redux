import axios from 'axios'

const baseUrl = '/api/login'

/**
 * Logs a user in to the application.
 *
 * Sends a POST request to the backend to log in with the given credentials.
 * If the login is successful, the backend returns the user data in JSON format,
 * which is then returned by this function.
 *
 * @param {Object} credentials - An object with the username and password of the user to log in.
 * @param {string} credentials.username - The username of the user to log in.
 * @param {string} credentials.password - The password of the user to log in.
 *
 * @return {Promise<Object>} A Promise that resolves to the user data if the login is successful.
 */
const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
