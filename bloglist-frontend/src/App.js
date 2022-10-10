import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

import LoginForm from './components/login-form'
import CreateForm from './components/create-form'
import BlogsList from './components/blogslist'
import Togglable from './components/togglable'
import Notification from './components/notification'
import Logout from './components/logout'

import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => 
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const setNotification = (message, status) => {
    setMessage([message, status])
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification(`${user.name} is logged in`, 200)
    } catch (exception) {
      setNotification('wrong username or password', exception.response.status)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  
    const response = await blogService.getAll()
    setBlogs(response)
    setNotification('logout successful', 200)
  }
  
  const createFormRef = useRef()

  const createBlog = async (blogObject) => {
    try {
      await blogService.create(blogObject)
      createFormRef.current.toggleVisibility()
      const response = await blogService.getAll()
      setBlogs(response)
      setNotification(`${blogObject.title} by ${blogObject.author} added`, 200)
    } catch(e) {
      setNotification(e.message, e.response.status)
    }
  }

  const likeBlog = async (blogObject) => {
    await blogService.like(blogObject)
    const response = await blogService.getAll()
    setBlogs(response)
    setNotification(`${blogObject.title} by ${blogObject.author} liked`, 200)
  }

  const removeBlog = async (blogObject) => {
    if(window.confirm(`remove ${blogObject.title} by ${blogObject.author}?`)) {
      await blogService.remove(blogObject)
      const response = await blogService.getAll()
      setBlogs(response)
      setNotification(`${blogObject.title} by ${blogObject.author} removed`, 200)
    }
  }

  

  return (
    <div>
      {user === null ?
      <>
        <h1>log in to application</h1>
        <Notification message={message} />
        <LoginForm 
          handleLogin={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
      </> :
      <>
        <h1>blogs</h1>
        <Notification message={message} />
        <Logout user={user} handleLogout={handleLogout}/>
        <Togglable buttonLabel="add blog" ref={createFormRef}>
          <CreateForm createBlog={createBlog} />
        </Togglable>
        <BlogsList 
          handleLogout={handleLogout}
          user={user}
          blogs={blogs}
          likeBlog={likeBlog}
          removeBlog={removeBlog}
        />
      </>
      }
    </div>
  )
}

export default App
