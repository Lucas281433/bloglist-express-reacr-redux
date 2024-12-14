import { forwardRef, useImperativeHandle, useState } from 'react'
import { Button } from 'react-bootstrap'

import PropTypes from 'prop-types'
import blogWriting from '../../assets/blog-writing.png'

import './Togglable.css'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    //The button-style class is in the index.css file
    <div>
      <div style={hideWhenVisible}>
        <Button
          className='button-style'
          onClick={toggleVisibility}
        >
          <i className="bi bi-plus-circle me-1"></i>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        <div className="d-flex flex-row justify-content-around align-items-center flex-wrap">
          <img src={blogWriting} width="50%" />
          <div>
            {props.children}
            <div className="d-flex">
              <Button
                variant="danger"
                className='button-cancel'
                onClick={toggleVisibility}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
