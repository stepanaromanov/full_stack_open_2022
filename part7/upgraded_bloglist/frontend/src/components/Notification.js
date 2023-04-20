const Notification = ({ notification }) => {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      marginBottom: 5,
      color: `${notification.includes('ERROR') ? '#F84F31' : '#23C552'}`
    }

    return (
      notification &&
      <div style={style}>
        {notification}
      </div>
    )
}
    
export default Notification
  