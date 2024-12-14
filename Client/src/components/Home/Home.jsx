import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createBlog } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'
import { Badge, Container, ListGroup, Stack } from 'react-bootstrap'

import Togglable from '../Togglable/Togglable'
import BlogForm from '../BlogForm/BlogForm'
import Notification from '../Notification/Notification'

import blogAppImg from '../../assets/blogs-app.avif'
import './Home.css'

/**
 * The Home component renders the home page of the blog app.
 * It displays all the blogs in the store sorted by the number of likes.
 * It also renders a Togglable component that contains a BlogForm component.
 * When a new blog is submitted, it dispatches the createBlog action
 * and shows a notification with the title and author of the blog.
 * If there is an error, it shows a notification with the error message.
 */
const Home = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const blogFormRef = useRef()

  /**
   * Add a new blog to the store.
   * Dispatches the createBlog action with the new blog.
   * If successful, shows a notification with the title and author of the new blog.
   * If there is an error, shows a notification with the error message.
   *
   * @param {Object} newBlog - The new blog to be created.
   * @param {string} newBlog.title - The title of the blog.
   * @param {string} newBlog.author - The author of the blog.
   * @param {string} newBlog.url - The url of the blog.
   */
  const addBlog = async (newBlog) => {
    try {
      dispatch(createBlog(newBlog))
      blogFormRef.current.toggleVisibility()

      dispatch(
        setNotification(`A new blog ${newBlog.title} By ${newBlog.author}`, 5),
      )
    } catch (error) {
      dispatch(setNotification('Error could not create blog', 5))
    }
  }

  const blogsSorted = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2 className="h1 text-center">Blog App</h2>
      <Stack className="d-flex align-items-center mb-2">
        <img src={blogAppImg} width="50%" className="home-image" />
      </Stack>
      <Notification />
      <div className="d-flex justify-content-center align-items-center mb-2">
        <Togglable buttonLabel="New Blog" ref={blogFormRef}>
          <BlogForm newBlog={addBlog} />
        </Togglable>
      </div>
      <Container>
        <ListGroup as="ol" numbered>
          {blogsSorted.map((blog) => (
            <ListGroup.Item
              key={blog.id}
              as="li"
              className="d-flex justify-content-between align-items-start home-list"
            >
              <div className="ms-2 me-auto">
                <Link to={`/blogs/${blog.id}`}>
                  <div className="fw-bold">{blog.title}</div>
                </Link>
                Author: {blog.author}
              </div>
              <Badge bg="primary" pill>
                {blog.likes}
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </div>
  )
}

export default Home
