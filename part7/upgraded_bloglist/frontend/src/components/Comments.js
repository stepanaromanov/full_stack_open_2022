import { useField } from '../hooks'
import blogService from '../services/blogs'
import { useQueryClient } from 'react-query'
import { deleteNotification } from '../reducers/notificationReducer'
import { useNotificationDispatch } from '../reducers/NotificationContext'

const Comments = ({ blog }) => {
  const { reset: resetComment, ...comment } = useField("text")
  const { comments } = blog
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const createComment = async (id, comment) => {
    try {
      const updatedBlog = await blogService.addComment(id, comment)
      const blogs = queryClient.getQueryData('blogs')
      const mutatedBlogs = blogs.map(blog => 
          blog.id === updatedBlog.id ? updatedBlog : blog)
      queryClient.setQueryData('blogs', mutatedBlogs)
  
      notificationDispatch({ type: 'COMMENT', payload: updatedBlog })
      deleteNotification(notificationDispatch)
    } catch (exception) {
      notificationDispatch({ type: 'ERROR', payload: exception.response.data.error })
      deleteNotification(notificationDispatch)
    }
  }

  const handleComment = (event) => {
    event.preventDefault()
    if (!comment.value.trim()) return
    const newComment = comment.value
    createComment(blog.id, newComment)
    resetComment()
  }

  return (
    <div>
      <p>Comments</p>
      <form onSubmit={handleComment}>
        <input name='comment' {...comment} />
        <button type="submit">add</button>
      </form>
      {comments.length > 0 ? 
        (
            <ul>
            {comments.map((comment, i) => (
                <li key={i}>{comment}</li>
            ))}
            </ul>
        ) :
        (
            <p>There are no comments yet...</p>
        )
      }
    </div>
  )
}

export default Comments