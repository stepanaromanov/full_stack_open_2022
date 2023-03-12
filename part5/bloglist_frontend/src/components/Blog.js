import { useState } from "react"

const Blog = ({blog, user, increaseLikes, removeBlog}) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikes = () => {
    const targetBlog = {
      id: blog.id,
      author: blog.author,
      title: blog.title,
      likes: blog.likes + 1,
      user: blog.user
    }
    increaseLikes(blog.id, targetBlog)
  }

  const handleRemove = () => {
    removeBlog(blog.id)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <div>
          {blog.title}
        </div>  
        <button className="show" onClick={toggleVisibility}>show</button>
      </div>
      <div className ="details" style={showWhenVisible}>
        <div className="blog" style={blogStyle}>
          <p className="title">{blog.title}</p>
          <p className="author">{blog.author}</p>
          <p className="url">{blog.url}</p>
          <p className="likes">{blog.likes}<button id="likeButton" className="like" onClick={handleLikes}>like</button></p>
          <p>{user}</p>
          <button id="removeButton" onClick={handleRemove}>remove</button>
        </div>  
        <button id="hideButton" className="hide" onClick={toggleVisibility}>hide</button>
      </div>
    </div>
  )
}

export default Blog