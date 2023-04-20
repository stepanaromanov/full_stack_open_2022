import { useState } from "react";

const NewBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = (event) => {
    event.preventDefault()
    createBlog(title, author, url)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
        <form onSubmit={handleCreateBlog}>
        <div>
            title:
            <input
            id="newtitle"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            />
        </div>
        <div>
            author:
            <input
            id="newauthor"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            />
        </div>
        <div>
            url:
            <input
            id="newurl"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            />
        </div>
        <button id="newblogcreate" type="submit">create</button>
        </form>   
    </div>
  )
}

export default NewBlog
