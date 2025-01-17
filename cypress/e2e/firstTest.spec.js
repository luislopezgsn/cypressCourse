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

})
