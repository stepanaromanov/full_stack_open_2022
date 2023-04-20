import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NewBlog from './NewBlog'
import Togglable from './Togglable'
import { useQueryClient } from 'react-query'

const BlogList = ({ create }) => {
    const queryClient = useQueryClient()
    const blogs = queryClient.getQueryData('blogs')

    if (!blogs) {
        return null
    }

    return (
        <div>
            <Togglable buttonLabel="new blog">
                <NewBlog createBlog={create} />
            </Togglable>
            <h2>Blogs</h2>
            <Table striped>
                <tbody>
                    {blogs.sort((a,b) => a.likes > b.likes ? -1 : 1)
                            .map(blog =>
                                <tr key={blog.id}>
                                    <td>
                                        <Link to={`/blogs/${blog.id}`}>
                                            {blog.title}
                                        </Link>
                                    </td>
                                </tr>
                    )}
                </tbody>
            </Table>
    </div>
    )
}

export default BlogList