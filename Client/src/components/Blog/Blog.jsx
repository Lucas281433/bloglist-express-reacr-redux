import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addComment, giveLike, removeBlog } from '../../reducers/blogReducer'
import { Button, Card, CardBody, Form, ListGroup } from 'react-bootstrap'

import blogImg from '../../assets/blog-writing.png'
import './Blog.css'

/**
 * A single blog post component.
 *
 * Shows the title, author, URL, likes, and comments of the blog post.
 * Provides a button to like the blog post, and a form to add a comment.
 * If the user is the same as the one who created the blog post, shows a
 * button to remove the blog post.
 *
 * @param {Object} blog The blog post to display
 * @returns {JSX.Element} The blog post component
 */
const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const [comment, setComment] = useState('')
  const navigate = useNavigate()

  if (!blog) {
    return null
  }

  /**
   * Handler for the "Like" button. Dispatches the giveLike action with the
   * current blog post.
   *
   * @param {Object} blog The blog post to like
   */
  const handleaddLike = async (blog) => {
    dispatch(giveLike(blog))
  }

  /**
   * Handler for the "Remove" button. Confirms with the user if they really
   * want to remove the blog post, and if so, dispatches the removeBlog action
   * with the ID of the blog post to remove. After the blog post is removed,
   * navigates back to the home page.
   *
   * @param {number} id The ID of the blog post to remove
   */
  const handleRemoveBlog = async (id) => {
    const blogToDelete = blogs.find((blog) => blog.id === id)
    if (
      window.confirm(
        `Remove Blog ${blogToDelete.title} By ${blogToDelete.author}`,
      )
    ) {
      dispatch(removeBlog(id))
      navigate('/')
    }
  }

  /**
   * Handler for the "Add Comment" button. Prevents the default form submission
   * event, sets the comment state to the value of the comment input field,
   * dispatches the addComment action with the current blog post and the
   * comment, and then resets the comment state to an empty string.
   *
   * @param {Object} event The event triggered by the "Add Comment" button
   */
  const handleAddComment = (event) => {
    event.preventDefault()
    setComment(event.target.value)
    dispatch(addComment(blog, { comment: comment }))
    setComment('')
  }

  return (
    <div className="blog d-flex flex-column justify-content-center align-items-center">
      <Card className="blog-card">
        <CardBody className="d-flex flex-column align-items-center">
          <h2 className="h2">{blog.title}</h2>
          <p>
            <strong>Author:</strong> {blog.author}
          </p>
          <p>
            <strong>Url: </strong>
            <a href={blog.url} target="blank">
              {blog.url}
            </a>
          </p>
          <p>
            <strong>Likes: </strong>
            {blog.likes}
            <Button
              onClick={() => handleaddLike(blog)}
              className="button-style button-like like-button"
            >
              <i className="bi bi-hand-thumbs-up-fill me-1"></i>
              Like
            </Button>
          </p>
          <p>
            <strong>Added by {blog.user ? blog.user.name : null}</strong>
          </p>
          {blog.user && blog.user.name === user.name ? (
            <Button
              variant="danger"
              className="button-remove"
              onClick={() => handleRemoveBlog(blog.id)}
            >
              <i className="bi bi-trash-fill me-1"></i>
              Remove
            </Button>
          ) : null}
        </CardBody>
      </Card>
      <h3 className="h3 text-center my-3">Comments</h3>
      <div className="d-flex flex-row justify-content-center align-items-start flex-wrap gap-2">
        <img className="image-comment" src={blogImg} alt="" />
        <div>
          <Form onSubmit={handleAddComment}>
            <div className="d-flex flex-row align-items-center">
              <Form.Control
                size="md"
                value={comment}
                className="input-style"
                onChange={({ target }) => setComment(target.value)}
              />

              <Button className="button-style" type="submit">
                <div className="d-flex flex-row">
                  <i className="bi bi-plus-circle-fill me-1"></i>
                  Add
                </div>
              </Button>
            </div>
          </Form>
          {blog.comments.length === 0  ? (
            <p className='text-center mt-3'>No comments yet</p>
          ) : (
            <ListGroup className="blog-list-position">
              {blog.comments.map((comment, index) => (
                <ListGroup.Item className="blog-list" key={index}>
                  <i className="bi bi-chat-square-text-fill blog-list-icon"></i>
                  {comment}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </div>
      </div>
    </div>
  )
}

export default Blog
