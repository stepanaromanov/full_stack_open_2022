import { useQueryClient } from 'react-query'
import { useUserProfile } from '../reducers/UserContext'
import { useParams } from "react-router-dom"
import Comments from './Comments'

const Blog = ({ removeBlog, increaseLikes }) => {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData('blogs')
  const user = useUserProfile()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blog = blogs.find(blog => blog.id === id)

  return (
    <div>
      <div className="blog" style={blogStyle}>
        <p className="title">{blog.title}</p>
        <p className="author">{blog.author}</p>
        <p className="url">{blog.url}</p>
        <p className="likes">{blog.likes}<button id="likeButton" className="like" onClick={() => increaseLikes(blog)}>like</button></p>
        <p>{user.name}</p>
        <button id="removeButton" onClick={() => removeBlog(blog.id)}>remove</button>
      </div>
      <Comments blog={blog}  />
    </div>
  )
}

export default Blog
