import { createContext, useReducer, useContext } from 'react'
import notificationReducer from './notificationReducer'

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')
    return (
      <NotificationContext.Provider value={[notification, notificationDispatch]}>
        {props.children}
      </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const contextData = useContext(NotificationContext)
    return contextData[0]
}

export const useNotificationDispatch = () => {
    const contextData = useContext(NotificationContext)
    return contextData[1]
}

export default NotificationContext