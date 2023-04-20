import { createContext, useReducer, useContext } from 'react'
import userReducer from './userReducer'

const UserContext = createContext()

export const UserContextProvider = (props) => {
    const [userProfile, userProfileDispatch] = useReducer(userReducer, '')
    return (
      <UserContext.Provider value={[userProfile, userProfileDispatch]}>
        {props.children}
      </UserContext.Provider>
    )
}

export const useUserProfile = () => {
    const contextData = useContext(UserContext)
    return contextData[0]
}

export const useUserProfileDispatch = () => {
    const contextData = useContext(UserContext)
    return contextData[1]
}

export default UserContext