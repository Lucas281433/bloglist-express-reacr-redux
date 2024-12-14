import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

/**
 * Sets the token to be used in the Authorization header of all blog service
 * requests.
 *
 * @param {string} newToken - The new token to be used.
 */
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

/**
 * Fetches all blog posts from the server.
 *
 * Sends a GET request to the base URL to retrieve all blog data.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of blog posts.
 */
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

/**
 * Creates a new blog post on the server.
 *
 * Sends a POST request to the base URL with the new blog data and the
 * Authorization header set to the current token.
 *
 * @param {Object} newBlog - The blog post to be created.
 * @returns {Promise<Object>} A promise that resolves to the newly created blog post.
 */
const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

/**
 * Updates a blog post on the server.
 *
 * Sends a PUT request to the base URL with the blog ID and the updated blog
 * data, and the Authorization header set to the current token.
 *
 * @param {number} id - The ID of the blog post to be updated.
 * @param {Object} blog - The updated blog data.
 * @returns {Promise<Object>} A promise that resolves to the updated blog post.
 */
const update = async (id, blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, blog, config)
  return response.data
}

/**
 * Deletes a blog post from the server.
 *
 * Sends a DELETE request to the base URL with the blog ID and the
 * Authorization header set to the current token.
 *
 * @param {number} id - The ID of the blog post to be deleted.
 * @returns {Promise<Object>} A promise that resolves to the response data of the deleted blog post.
 */
const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

/**
 * Adds a comment to a specific blog post on the server.
 *
 * Sends a POST request to the base URL with the blog ID and the comment data.
 *
 * @param {number} id - The ID of the blog post to add a comment to.
 * @param {Object} comment - The comment data to be added.
 * @returns {Promise<Object>} A promise that resolves to the added comment data.
 */
const createComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment)
  return response.data
}

export default { getAll, create, update, remove, setToken, createComment }
