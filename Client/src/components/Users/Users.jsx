import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initialzeUsers } from '../../reducers/usersReducer'
import { Link } from 'react-router-dom'
import { Container, Table } from 'react-bootstrap'

import usersImg from '../../assets/users.png'
import './Users.css'

/**
 * The Users component fetches and displays a list of all users.
 * Each user is displayed with their name (as a link to their profile) and the number
 * of blogs they have created.
 *
 * This component uses Redux to fetch the users data from the store and dispatches
 * the initializeUsers action to load users when the component mounts.
 *
 * @returns {JSX.Element} The Users component
 */
const Users = () => {
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialzeUsers())
  })

  return (
    <Container className="d-flex flex-column align-items-center">
      <img src={usersImg} className='users-image' />
      <h2 className="h2">Users</h2>
      <Table>
        <thead>
          <tr>
            <th className='users-table'></th>
            <th className='users-table'>
              Blogs Created
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className='users-table'>
                <Link to={`/users/${user.id}`}>
                  <strong>{user.name}</strong>
                </Link>
              </td>
              <td className='users-table'>
                {user.blogs.length}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default Users
