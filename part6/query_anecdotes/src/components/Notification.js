const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    notification &&
    <div style={style}>
      {notification}
    </div>
  )
}

export const deleteNotification = (dispatch) => {
  setTimeout(() => 
    dispatch({ type: 'CLEAR' }), 5000)
}

export default Notification
