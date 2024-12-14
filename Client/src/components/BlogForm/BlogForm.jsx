import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

/**
 * This component renders a form for creating a new blog
 * @param {function} newBlog - function to be called when the form is submitted
 * @returns {ReactElement} a form with fields for title, author and url, and a submit button
*/
const BlogForm = ({ newBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  /**
   * Called when the form is submitted. Prevents the default form submission
   * event, sends the new blog data to the callback function, and resets the
   * form fields to empty strings.
   *
   * @param {Object} event The event triggered by form submission
   */
  const addBlog = (event) => {
    event.preventDefault()

    newBlog({
      title,
      author,
      url,
    })
    /*
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    */

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <Form
        onSubmit={addBlog}
        className="d-flex flex-column justify-content-center gap-1"
      >
        <h2>Create a new Blog </h2>
        <Form.Group>
          <Form.Control
            type="text"
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            id="title"
            placeholder="Title:"
            className='input-style'
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            id="author"
            placeholder="Author:"
            className='input-style'
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            id="url"
            placeholder="Url:"
            className='input-style'
          />
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button
            type="submit"
            className="createButton button-style"
          >
            Create
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default BlogForm
