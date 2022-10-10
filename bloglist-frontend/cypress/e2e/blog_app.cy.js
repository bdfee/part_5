/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'test',
      username: 'test-user',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function () {
    cy.visit('http://localhost:3000')
    cy.contains('log in to application')
    cy.get('#username-input')
    cy.get('#password-input')
    cy.get('#login-button')
  })
  // actual log in flor
  describe('login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username-input').type('test-user')
      cy.get('#password-input').type('secret')
      cy.get('#login-button').click()

      cy.contains('blogs')
      cy.checkNotification('test is logged in')
    })

    it('fails with incorrect password', function () {
      cy.get('#username-input').type('test-user')
      cy.get('#password-input').type('wrong')
      cy.get('#login-button').click()

      cy.checkNotification('wrong username or password', true)
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test-user', password: 'secret' })
    })

    it('blogform can be opened', function () {
      cy.get('#toggle-open-button').click()
      cy.get('#title-input')
      cy.get('#author-input')
      cy.get('#url-input')
    })

    it('opened blogform can be closed', function () {
      cy.get('#toggle-open-button').click()
      cy.get('#toggle-close-button').click()
      cy.get('#toggle-open-button').should('contain','add blog')
    })

    it('a blog can be created', function () {
      cy.createBlog({
        title: 'cypress-title',
        author: 'cypress-author',
        url: 'cypress-url'
      })
      cy.checkNotification('cypress-title by cypress-author added')
      cy.contains('cypress-title cypress-author')
    })

    it('a blog can be liked', function () {
      cy.createBlog({
        title: 'cypress-title',
        author: 'cypress-author',
        url: 'cypress-url'
      })
      cy.visit('http://localhost:3000')
      cy.contains('cypress-title cypress-author')
        .parent()
        .find('button')
        .contains('view')
        .click()

      cy.contains('like').click()
      cy.contains('like').parent().contains(1)
      cy.checkNotification('cypress-title by cypress-author liked')
    })

    it('a user can delete their own blog', function () {
      cy.createBlog({
        title: 'cypress-title',
        author: 'cypress-author',
        url: 'cypress-url'
      })
      cy.visit('http://localhost:3000')
      cy.get('#view-button').click()
      cy.get('#delete-button').click()
      cy.on('window:confirm', () => true)

      cy.checkNotification('cypress-title by cypress-author removed')
    })

    it('a user cannot delete anothers blog', function () {
      cy.createBlog({
        title: 'cypress-title',
        author: 'cypress-author',
        url: 'cypress-url'
      })
      // logout
      cy.visit('http://localhost:3000').wait(250)
      cy.get('#login-button').click()
      // create second user
      const user2 = {
        name: 'test2',
        username: 'test-user2',
        password: 'secret'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user2)
      // login on user2
      cy.visit('http://localhost:3000')
      cy.get('#username-input').type('test-user2')
      cy.get('#password-input').type('secret')
      cy.get('#login-button').click()
      // try to delete the entry
      cy.get('#view-button').click()
      cy.get('#test-blog-title-author').should('not.contain', '#delete-button')
    })

    it('blogs are ordered by decending like count', function () {
      cy.createBlog({
        title: 'cypress-title-high',
        author: 'cypress-author-high',
        url: 'cypress-url-high'
      })

      cy.createBlog({
        title: 'cypress-title-low',
        author: 'cypress-author-low',
        url: 'cypress-url-low'
      })

      cy.createBlog({
        title: 'cypress-title-mid',
        author: 'cypress-author-mid',
        url: 'cypress-url-mid'
      })

      cy.visit('http://localhost:3000')

      cy.contains('cypress-title-high cypress-author-high')
        .parent()
        .find('button')
        .contains('view')
        .click()

      cy.contains('cypress-title-high cypress-author-high')
        .parent()
        .find('button')
        .contains('like')
        .click()
        .wait(1000)
        .click()

      cy.contains('cypress-title-high cypress-author-high')
        .parent()
        .find('button')
        .contains('close')
        .click()

      cy.contains('cypress-title-mid cypress-author-mid')
        .parent()
        .find('button')
        .contains('view')
        .click()


      cy.contains('cypress-title-mid cypress-author-mid')
        .parent()
        .find('button')
        .contains('like')
        .click()

      cy.visit('http://localhost:3000')

      cy.get('.blog').eq(0).should('contain', 'cypress-title-high cypress-author-high')
      cy.get('.blog').eq(2).should('contain', 'cypress-title-low cypress-author-low')
    })
  })
})