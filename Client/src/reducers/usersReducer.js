import { createSlice } from '@reduxjs/toolkit'
import { getAllUsers } from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {

    /**
    * Sets the users state with the provided payload.
    *
    * @param {Array} state - The current state of the users.
    * @param {Object} action - The action containing the payload.
    * @param {Array} action.payload - The new users state to be set.
    * @returns {Array} The updated state with the new user data.
    */
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const { setUsers } = usersSlice.actions

/**
 * Asynchronously fetches all users from the service and dispatches an action
 * to set the user state in the Redux store with the retrieved data.
 *
 * @returns {Function} A thunk function that fetches users and dispatches the setUsers action.
 */
export const initialzeUsers = () => {
  return async (dispatch) => {
    const users = await getAllUsers()
    dispatch(setUsers(users))
  }
}

export default usersSlice.reducer
