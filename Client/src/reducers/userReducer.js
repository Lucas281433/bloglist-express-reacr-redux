import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogsService from '../services/blogs'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {

    /**
     * Sets the user state in the Redux store.
     *
     * @param {Object} state The current state of the user.
     * @param {Object} action The action containing the payload to set the user state.
     * @param {Object} action.payload The new user state to be set.
     * @returns {Object} The updated state with the new user data.
     */
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

/**
 * Logs a user in by attempting to log in with the given username and password.
 * If the login is successful, the user data is stored in the Redux store and
 * the user token is stored in local storage and set in the blogs service.
 * If the login fails, a notification is set with an error message.
 *
 * @param {string} username - The username of the user to log in.
 * @param {string} password - The password of the user to log in.
 * @returns {Function} A thunk function that performs the login.
 */
export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const userLogin = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogListAppUser', JSON.stringify(userLogin))
      blogsService.setToken(userLogin.token)
      dispatch(setUser(userLogin))
    } catch (error) {
      dispatch(setNotification('Wrong Username or Password', 5))
    }
  }
}

export default userSlice.reducer
