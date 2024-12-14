import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import okImg from '../../assets/create.png'
import errorImg from '../../assets/404-not-found.png'

/**
 * A component that displays a notification message.
 *
 * The notification message is obtained from the Redux state
 * using the useSelector hook. If the notification is null,
 * the component returns null. Otherwise, the notification is
 * displayed in an Alert component from React-Bootstrap.
 *
 * If the notification starts with "A new", the notification
 * is displayed in green with a "ok" image. Otherwise, the
 * notification is displayed in red with a "404 not found"
 * image.
 */
const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === null) {
    return null
  }

  if (notification.startsWith('A new')) {
    return (
      <Alert variant='success'>
        <img style={{ width: '50%', height: '50%' }} src={okImg} alt="" />
        {notification}
      </Alert>
    )
  }

  return (
    <Alert variant='danger'>
      <img style={{ width:'50%', height: '50%' }} src={errorImg} alt="" />
      {notification}
    </Alert>
  )
}

export default Notification
