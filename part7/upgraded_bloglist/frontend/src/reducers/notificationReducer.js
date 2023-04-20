export const deleteNotification = (dispatch) => {
    setTimeout(() => 
      dispatch({ type: 'CLEAR' }), 5000)
}

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'CREATED':
            return `A new blog ${action.payload.title} by ${action.payload.author} added`
        case 'COMMENT':
            return `A new comment to blog ${action.payload.title} added`
        case 'ERROR':
          return `${action.type}: ${action.payload}`
        case 'CLEAR':
            return ''
        default:
            throw new Error(`Unknown action type: ${action.type}`)
    }
}

export default notificationReducer