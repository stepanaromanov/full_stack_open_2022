Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST',  'http://localhost:3003/api/login', {
      username, password
    }).then(({ body }) => {
      localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
      cy.visit('')
    })
  })
  
  Cypress.Commands.add('createBlog', ({ title, author, url, likes=0 }) => {
    cy.request({
      url: 'http://localhost:3003/api/blogs',
      method: 'POST',
      body: { title, author, url, likes },
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
      }
    })

    cy.visit('')
  })
  