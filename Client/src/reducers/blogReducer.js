import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
  /**
  * Sets the blog state to the provided payload.
  *
  * @param {Array} state - The current state of the blogs.
  * @param {Object} action - The action to be handled.
  * @param {Array} action.payload - The new blog state to be set.
  * @returns {Array} The updated state with the new blog data.
 */
    setBlog(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      return [...state, action.payload]
    },

    /**
    * Updates the likes of a specific blog post in the state.
    *
    * @param {Array} state - The current state of the blogs.
    * @param {Object} action - The action containing the payload.
    * @param {Object} action.payload - The updated blog with new likes.
    * @returns {Array} The updated state with the blog's likes modified.
    */
    updateLike(state, action) {
      const updatedBlog = action.payload
      return state.map((b) => (b.id !== updatedBlog.id ? b : updatedBlog))
    },

    /**
     * Deletes a blog post with the given id from the state.
     *
     * @param {Array} state - The current state of the blogs.
     * @param {Object} action - The action containing the payload.
     * @param {number} action.payload - The id of the blog to be deleted.
     * @returns {Array} The updated state without the deleted blog.
     */
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter((b) => b.id !== id)
    },

    /**
     * Appends a new comment to the given blog post in the state.
     *
     * @param {Array} state - The current state of the blogs.
     * @param {Object} action - The action containing the payload.
     * @param {Object} action.payload - The updated blog with new comment.
     * @returns {Array} The updated state with the blog's comments modified.
     */
    appendComment(state, action) {
      const updatedBlog = action.payload
      return state.map(b => b.id === updatedBlog.id ? updatedBlog : b)
    }
  },
})

export const { setBlog, appendBlog, updateLike, deleteBlog, appendComment } =
  blogsSlice.actions

/**
 * Asynchronously fetches all blogs from the service and dispatches an action
 * to set the blog state in the Redux store with the retrieved data.
 *
 * @returns {Function} A thunk function that fetches blogs and dispatches the setBlog action.
 */
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll()
    dispatch(setBlog(blogs))
  }
}

/**
 * Creates a new blog post and updates the blog state in the Redux store.
 *
 * Dispatches the appendBlog action with the newly created blog to add it to
 * the current state. Then, retrieves all blogs from the service and dispatches
 * the setBlog action to update the state with the complete list of blogs.
 *
 * @param {Object} newBlog - The new blog to be created.
 * @param {string} newBlog.title - The title of the blog.
 * @param {string} newBlog.author - The author of the blog.
 * @param {string} newBlog.url - The url of the blog.
 *
 * @returns {Function} A thunk function that handles creating a blog and updating the state.
 */
export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const createNewBlog = await blogsService.create(newBlog)
    dispatch(appendBlog(createNewBlog))
    const blogs = await blogsService.getAll()
    dispatch(setBlog(blogs))
  }
}

/**
 * Asynchronously gives a like to a blog post and updates the blog state in the Redux store.
 *
 * Dispatches the updateLike action with the blog post that has been liked.
 *
 * @param {Object} blog - The blog post to give a like to.
 * @param {number} blog.id - The ID of the blog post.
 * @param {string} blog.title - The title of the blog post.
 * @param {string} blog.author - The author of the blog post.
 * @param {string} blog.url - The URL of the blog post.
 * @param {number} blog.likes - The current number of likes the blog post has.
 *
 * @returns {Function} A thunk function that handles giving a like and updating the state.
 */
export const giveLike = (blog) => {
  return async (dispatch) => {
    const likeBlog = { ...blog, likes: blog.likes + 1 }
    await blogsService.update(blog.id)
    dispatch(updateLike(likeBlog))
  }
}

/**
 * Asynchronously removes a blog post from the service and updates the Redux
 * store state.
 *
 * Dispatches the deleteBlog action with the ID of the blog post to remove.
 *
 * @param {number} id - The ID of the blog post to remove.
 *
 * @returns {Function} A thunk function that handles removing a blog and updating the state.
 */
export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogsService.remove(id)
    dispatch(deleteBlog(id))
  }
}

/**
 * Asynchronously adds a comment to a blog post and updates the Redux store state.
 *
 * Dispatches the appendComment action with the updated blog containing the new comment.
 *
 * @param {Object} blog - The blog post to add a comment to.
 * @param {Object} param1 - An object containing the comment to be added.
 * @param {string} param1.comment - The comment to be added to the blog post.
 *
 * @returns {Function} A thunk function that handles adding a comment and updating the state.
 */
export const addComment = (blog, { comment }) => {
  return async dispatch => {
    const updatedBlog = { ...blog, comments: blog.comments.concat(comment) }
    await blogsService.createComment(blog.id, { comment: comment })
    dispatch(appendComment(updatedBlog))
  }
}

export default blogsSlice.reducer
