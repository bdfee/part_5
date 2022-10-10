import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({
  blog,
  likeBlog,
  removeBlog,
  user
}) => {
  const [showDetails, setShowDetails] = useState(false)
  
  const addLike = (e) => {
    e.preventDefault()
    likeBlog(blog)
  }

  const remove = (e) => {
    e.preventDefault()
    removeBlog(blog)
  }

  const { title, author, url, likes } = blog
  return (
    <div className='blog'>
      <div id='test-blog-title-author'>
        {title} {author}
        <button id='view-button' onClick={() => {setShowDetails(!showDetails)}}>
          {showDetails === true ? 'close' : 'view'}
        </button>
      </div>
      {showDetails === true ?
        <div>
          <div>{url}</div>
          <div>{likes} 
            <button onClick={addLike}>like</button>
          </div>
          <div>{user.name}</div>
          {blog.user.name === user.name ?
            <button id='delete-button' onClick={remove}>remove</button> :
            null
          }
        </div> :
        null
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog