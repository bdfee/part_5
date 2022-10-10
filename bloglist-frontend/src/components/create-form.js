import { useState } from 'react'
import PropTypes from 'prop-types'

const CreateForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    createBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title-input">
            title:  
          </label>
          <input
            id='title-input'
            type='text'
            value={title}
            name='Title'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='author-input'>
            author: 
          </label> 
          <input
              id='author-input'
              type='text'
              value={author}
              name='Author'
              onChange={(e) => setAuthor(e.target.value)}
            />
        </div>
        <div>
          <label htmlFor='url-input'>
            url: 
          </label>
          <input
              id='url-input' 
              type='text'
              value={url}
              name='Url'
              onChange={(e) => setUrl(e.target.value)}
            />
        </div>
        <button type='submit' id='create-blog-button'>create</button>
      </form>
    </div>
  )
}

CreateForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default CreateForm