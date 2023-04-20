describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'testuser',
      username: 'cyuser',
      password: 'cypassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  it('Login succeeds with correct credentials', function() {
    cy.get('form').within(() => {
      cy.get('#loginusername').type('cyuser')
      cy.get('#loginpassword').type('cypassword')
    })
    cy.get('#login-button').click()
    cy.contains('testuser logged in')
  })

  it('Login fails with wrong credentials', function() {
    cy.get('form').within(() => {
      cy.get('#loginusername').type('cyuser')
      cy.get('#loginpassword').type('wrongpassword')
    })
    cy.get('#login-button').click()
    cy.contains('Wrong credentials')
    cy.get('html').should('not.contain', 'testuser logged in')
  })
  
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ 
        username: 'cyuser', 
        password: 'cypassword' 
      })
    })

    it('a new blog can be added', function () {
      cy.contains('new blog').click()

      cy.get('#newtitle').type('cytitle')
      cy.get('#newauthor').type('cyauthor')
      cy.get('#newurl').type('cyurl')

      cy.get('#newblogcreate').click()
      cy.get('html').should('contain', 'A new blog cytitle by cyauthor added')
    })

    describe('When blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: "cytitle1",
          author: "cyauthor1",
          url: "cyurl1"
        })
      })

      it('user can like a blog', function() {
        cy.contains('cytitle1').parent().find('button').as('theShowButton')
        cy.get('@theShowButton').click()
        cy.get('#likeButton').click({force: true})
      })

      it('user can delete a blog', function() {
        cy.contains('cytitle1').parent().find('button').as('theShowButton')
        cy.get('@theShowButton').click()
        cy.get('#removeButton').click()
        cy.on('window:confirm', () => true)
        cy.get('html')
        cy.should('not.contain', 'cytitle1')
      })

      describe('List of blogs can be created', function() {
        beforeEach(function() {
          cy.createBlog({
            title: "cytitle2",
            author: "cyauthor2",
            url: "cyurl2",
            likes: 3
          })
      
          cy.createBlog({
            title: "cytitle3",
            author: "cyauthor3",
            url: "cyurl3",
            likes: 2
          })
        })

        it('and ordered by number of likes', function () {
          cy.get('.blog').eq(0).should('contain', 'cytitle2')
          cy.get('.blog').eq(1).should('contain', 'cytitle3')
          cy.get('.blog').eq(2).should('contain', 'cytitle1')
        })
        
      })
    })
  })
})    

