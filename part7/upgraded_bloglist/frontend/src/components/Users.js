import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useQueryClient } from 'react-query'

const Users = () => {
    const queryClient = useQueryClient()
    const users = queryClient.getQueryData('users')
    
    if (!users) {
        return null
    }
    
    return (
        <div>
            <h2>Users</h2>
            <Table striped>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <b>blogs created</b>
                        </td>
                    </tr>
                    {users.map(user =>
                        <tr key={user.id}>
                            <td>
                                <Link to={`/users/${user.id}`}>
                                        {user.name}
                                </Link>
                            </td>
                            <td>
                                {user.blogs.length}
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default Users