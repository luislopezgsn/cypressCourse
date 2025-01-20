/// <reference types="cypress" />

describe('First Test Suite', () => {

    it('First Test', () => {
      cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
      //by tag name
        cy.get('input')

        //by id
        cy.get('#inputEmail1')

        //by class value
        cy.get('.input-full-width')

        // by attribute name
        cy.get('[fullwidth]')

        // by attribute name and value
        cy.get('[placeholder="Email"]')

        // by entire class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        // by two different attributes
        cy.get('[placeholder="Email"][fullwidth]')

        // by tag, atribute id and class
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //by cypress test id
        cy.get('[data-cy="imputEmail1"]')

    })

    it('Second Test', () => {
      cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

       // Theory
       // get() - find elements on the page by locator globally
       // find() - find child elements by locator
       // contains() - find HTML text and by text and locator



        cy.contains('Sign in')
        cy.contains('[status="warning"]', 'Sign in')
        cy.contains('nb-card', 'Horizontal form').find('button')
        cy.contains('nb-card', 'Horizontal form').contains('Sign in')
        cy.contains('nb-card', 'Horizontal form').get('button')
       
        // Cypress chains and DOM
        cy.get('#inputEmail3')
          .parents('form')
          .find('button')
          .should('contain', 'Sign in')
          .parents('form')
          .find('nb-checkbox')
          .click({ force: true })
    })

})
