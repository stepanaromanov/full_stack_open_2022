const notificationReducer = (state, action) => {
    switch (action.type) {
      case 'SET':
          return `You created "${action.payload}" anecdote`  
      case 'VOTE':
          return `anecdote "${action.payload}" has been voted`
      case 'ERROR':
          return action.payload
      case 'CLEAR':
          return ''
      default:
          throw new Error(`Unknown action type: ${action.type}`)
    }
}

export default notificationReducer