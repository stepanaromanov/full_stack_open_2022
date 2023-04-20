import { useParams } from "react-router-dom";
import { useQueryClient } from 'react-query'

const User = () => {
    const { id } = useParams()
    const queryClient = useQueryClient()
    
    const users = queryClient.getQueryData('users')
    const user = users.find(user => user.id === id)
    
    if (!user) {
        return null
    }

    return (
        <div>
            <h2>{user.name}</h2>
            {user.blogs.length > 0 ? 
            <>
                <p>added blogs</p>
                <ul>
                    {user.blogs.map(blog =>
                        <li key={blog.id}>
                            {blog.title}
                        </li>
                    )}
                </ul>
            </> : 
            <>
                <p>User hasn't created blogs yet</p>
            </>
            }
        </div>
    )
}

export default User
