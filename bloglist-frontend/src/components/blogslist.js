import PropTypes from 'prop-types'

import Blog from './blog'

const BlogsList = ({
  blogs,
  likeBlog,
  removeBlog,
  user
}) => {
  const sortedDescending = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <div id='blog-list'>
        {sortedDescending.map(blog =>
          <Blog 
            key={blog.id} 
            blog={blog} 
            likeBlog={likeBlog} 
            removeBlog={removeBlog}
            user={user}
          />
        )}
      </div>
    </div>
  )
}

BlogsList.propTypes = {
  blogs: PropTypes.array,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default BlogsList