import { Button, Form, Row, Stack } from 'react-bootstrap'

import Notification from '../Notification/Notification'

import PropTypes from 'prop-types'
import loginImage from '../../assets/login.png'
import './LoginForm.css'

/**
 * A form for logging in to the application.
 *
 * Props:
 * - `handleLogin`: The function to call when the form is submitted.
 * - `username`: The current value of the username field.
 * - `password`: The current value of the password field.
 * - `handleUsernameChange`: The function to call when the username field is changed.
 * - `handlePasswordChange`: The function to call when the password field is changed.
 *
 * Returns a `div` containing a form with fields for username and password, and
 * a submit button. Also includes a `Notification` component for displaying
 * notifications.
 *
 * The form is styled using Bootstrap, with a vertical stack of form elements,
 * and a button at the bottom with a login icon.
 *
 * The form is also styled to have a background image of a login icon.
 */
const LoginForm = ({
  handleLogin,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
}) => {
  return (
    //The input-style and button-style classes are in the index.css file
    <div>
      <Notification />
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: '100dvh' }}
      >
        <img src={loginImage} width="100%" className="image-position" />
        <div className="d-flex flex-column justify-content-center align-items-center form-position">
          <h2>Log in to Application</h2>
          <Form onSubmit={handleLogin}>
            <Stack>
              <Form.Group as={Row} className="mb-3">
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={handleUsernameChange}
                  id="username"
                  className="input-style"
                />
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  id="password"
                  className="input-style"
                />
              </Form.Group>

              <Button className="button-style" type="submit">
                <i className="bi bi-box-arrow-in-right fs-5 me-2"></i>
                Login
              </Button>
            </Stack>
          </Form>
        </div>
      </div>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
}

export default LoginForm
