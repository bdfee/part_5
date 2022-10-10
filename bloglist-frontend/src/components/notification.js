import PropTypes from 'prop-types'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  } else {
    const [text, status] = message
    return (
      <div id='notification' className={`notification ${(status) ? '_' + status : null}`}>
        {text}
      </div>
    )
  } 
}

Notification.propTypes = {
  message: PropTypes.array
}

export default Notification