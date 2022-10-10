import PropTypes from 'prop-types'

const Logout = ({ user, handleLogout }) => {
  return (
    <div className={'logout'}>
      {`${user.name} is logged in`}
      <button type='button' id='login-button'onClick={handleLogout}>logout</button>
    </div>
  )
}

Logout.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired
}
          
export default Logout
          