import axios from 'axios'

const baseUrl = '/api/users'

/**
 * Fetches all users from the backend.
 *
 * Sends a GET request to the base URL and returns a promise that resolves to
 * an array of user objects.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of user objects.
 */
export const getAllUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
