import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, loginUser } from './reducers/userReducer'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'

import LoginForm from './components/LoginForm/LoginForm'
import Home from './components/Home/Home'
import Users from './components/Users/Users'
import User from './components/User/User'
import Blog from './components/Blog/Blog'

import blogService from './services/blogs'
import blogIcon from './assets/Blog.png'

/**
 * The main application component that sets up the blog application.
 *
 * Manages the login state of the user and controls the routing of the application.
 *
 * Uses Redux to manage global states such as user and blogs.
 *
 * Contains handlers for user login and logout.
 *
 * Initially fetches all blogs and sets the token for the current user if logged in.
 *
 * Renders different components based on the current URL route, including
 * the home page, users list, user details, and blog details.
 *
 * Displays a navigation bar with links to different parts of the application.
 *
 * @returns {JSX.Element} The main application component.
 */
const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((b) => b.id === match.params.id) : null

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  /**
  * Handles the login form submission event.
  *
  * Prevents the default form submission behavior, dispatches the loginUser
  * action with the provided username and password, and then resets the
  * username and password fields to empty strings.
  *
  * @param {Object} event The event triggered by form submission.
  */
  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(loginUser(username, password))
    setUsername('')
    setPassword('')
  }

  /**
  * Handles the logout process for the user.
  *
  * Removes the user data from local storage and dispatches an action
  * to update the user state to null, effectively logging the user out.
  */
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogListAppUser')
    dispatch(setUser(null))
  }

  if (user === null) {
    return (
      <div>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </div>
    )
  }

  return (
    <div>
      <Navbar expand="sm" data-bs-theme="light" className="nav-bar">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Brand>
            <img src={blogIcon} width="50" height="50" alt="logo" />
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" as={'span'}>
                <Link className="nav-link-decoration" to={'/'}>
                  Blogs
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as={'span'}>
                <Link className="nav-link-decoration" to={'/users'}>
                  Users
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <i className="bi bi-person-circle mx-2 fs-5 user-icon"></i>
              <span className="nav-text">
                <i>{user.name} </i> Logged In
              </span>
              <Button
                variant="danger"
                size="sm"
                className="m-2"
                onClick={handleLogout}
              >
                <i className="bi bi-person-fill-slash me-1 fs-5"></i>
                Logout
              </Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<Users />} />
        <Route path="/blogs/:id" element={<Blog blog={blog} />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
