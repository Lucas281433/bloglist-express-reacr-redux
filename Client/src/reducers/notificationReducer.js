import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {

    /**
     * Show a notification with the given message.
     * @param {String} action.payload The message to be displayed.
     * @returns {String} The new state with the notification message.
     */
    showNotification(state, action) {
      return action.payload
    },

    /**
     * Hide the notification.
     * @returns {Null} The new state without any notification message.
     */
    hideNotification(state, action) {
      return null
    },
  },
})

export const { showNotification, hideNotification } = notificationSlice.actions

/**
 * Show a notification with the given message, and then hide it after the given amount of seconds.
 * @param {String} message The message to be displayed.
 * @param {Number} seconds The amount of seconds to wait before hiding the notification.
 */
export const setNotification = (message, seconds) => {
  return async (dispatch) => {
    dispatch(showNotification(message))
    setTimeout(() => {
      dispatch(hideNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
