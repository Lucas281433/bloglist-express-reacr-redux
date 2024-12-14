import { Container, ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import userImg from '../../assets/user.png'
import './User.css'

/**
 * A single user component.
 *
 * Shows the name of the user, and a list of all the blogs the user has added.
 *
 * @returns {JSX.Element} The user component
 */
const User = () => {
  const users = useSelector((state) => state.users)
  const id = useParams().id
  const user = users.find((user) => user.id === id)

  if (!user) {
    return null
  }

  return (
    <Container>
      <h2 className="h2">
        <i
          className="bi bi-person-circle mx-2 fs-12 icon-user"
        ></i>
        {user.name}
      </h2>
      <div className="d-flex justify-content-center">
        <img src={userImg} className='user-image' />
      </div>
      <h3 className="h3 text-center">Added Blogs</h3>
      <ListGroup>
        {user.blogs.map((blog) => (
          <ListGroup.Item
            className='user-list'
            key={blog.id}
          >
            <i className="bi bi-file-earmark-post-fill me-1"></i>
            <strong>{blog.title}</strong>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  )
}

export default User
