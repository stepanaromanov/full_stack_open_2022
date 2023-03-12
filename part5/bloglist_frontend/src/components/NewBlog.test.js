import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlog from './NewBlog.js'
import userEvent from '@testing-library/user-event'

test('form calls the event handler it received as props with the right details when a new blog is created', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  let component
  component = render(<NewBlog createBlog={createBlog} />)

  const inputTitle = component.container.querySelector('input[name="title"]')
  await user.type(inputTitle, "testtitle...")
  
  const inputAuthor = component.container.querySelector('input[name="author"]')
  await user.type(inputAuthor, "testauthor...")

  const inputUrl = component.container.querySelector('input[name="url"]')
  await user.type(inputUrl, "testurl...")

  const createButton = screen.getByText('create')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)

  expect(createBlog.mock.calls[0][0]).toBe("testtitle...")
  expect(createBlog.mock.calls[0][1]).toBe("testauthor...")
  expect(createBlog.mock.calls[0][2]).toBe("testurl...")
})