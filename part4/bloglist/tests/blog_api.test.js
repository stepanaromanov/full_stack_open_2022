const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('all blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  expect(response.body)
    .toHaveLength(helper.initialBlogs.length)
}, 100000)

test('unique identifier property of the blog posts is named id', async () => {
  const blogs = await helper.blogsInDb()
  blogs.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
}, 100000)

test('blog post added and saved correctly', async () => {
  const newBlog = {
      title: "testname754823",
      author: "test",
      url: "http://test",
      likes: 1,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(n => n.title)
  expect(contents).toContain(
    'testname754823'
  )
}, 100000)

test('likes property is defined for every object', async () => {
  const blogs = await helper.blogsInDb()
  blogs.forEach(blog => {
    if (!blog.hasOwnProperty("likes")) {
      blog.likes = 0
    }
    expect(blog.likes).toBeDefined()
  })
}, 100000)

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const checkTitle = blogsAtEnd.map(r => r.title)

  expect(checkTitle).not.toContain(blogToDelete.title)
}, 100000)


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
test('an information in blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[id]
  console.log(blogToUpdate)

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)

  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
  })
    .catch(error => next(error))
  
}, 100000)

afterAll(async () => {
  await mongoose.connection.close()
})