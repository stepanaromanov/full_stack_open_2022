import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAllBlogs = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
   headers: {Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const deleteBlog = async (objectId) => {
  const config = {
    headers: {Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${objectId.id}`, config)
  return response.data
}

const update = async (updatedBlog) => {
  const config = {
    headers: {Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
  return response.data
}

const addComment = async (id, comment) => {
  const config = {
    headers: {Authorization: token },
  }

  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment }, config)
  return response.data
}

export default { 
  getAllBlogs, 
  create, 
  update,
  setToken,
  deleteBlog,
  addComment
}
