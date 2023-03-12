import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import Blog from './Blog'
const blog = {
  title: 'test_title',
  author: 'test_author',
  url: "test_url",
  likes: 0,
  user: {
    username: "test_username",
    name: "test_name",
  },
}

let component
const mockIncreaseLikes = jest.fn()

beforeEach(() => {
  component = render(
    <Blog blog={blog} increaseLikes={mockIncreaseLikes} />
  )
})

test('1. Renders title and author', () => {
  expect(component.container.querySelector(".title")).toBeDefined()
  expect(component.container.querySelector(".author")).toBeDefined()
})

test('2. Checks visibility when button is clicked', async () => {
  const blogDetails = component.container.querySelector(".details");
  const showButton = component.container.querySelector(".show")
  const hideButton = component.container.querySelector(".hide")

  fireEvent.click(showButton)
  expect(blogDetails).not.toHaveStyle('display: none;')
  
  fireEvent.click(hideButton)
  expect(blogDetails).toHaveStyle('display: none;') 
})

test('3. Double click of lilke button', async () => {
  const showButton = component.container.querySelector(".show")
  const likeButton = component.container.querySelector(".like")

  fireEvent.click(showButton)
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockIncreaseLikes.mock.calls).toHaveLength(2)
})