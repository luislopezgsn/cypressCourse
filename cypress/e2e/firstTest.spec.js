/// <reference types="cypress" />

const { using } = require("rxjs")

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

    it('Save the subject of the command', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')


        //CANT DO THIS
        // const usingTheGrid = cy.contains('nb-card', 'Using the Grid')
        // usingTheGrid.find('[for="inputEmail1"]').should('contain', 'Email')
        // usingTheGrid.find('[for="inputPassword2"]').should('contain', 'Password')

        // 1 Cypress alias
        cy.contains('nb-card', 'Using the Grid').as('usingTheGrid')
        cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain', 'Password')

        // 2 Cypress .then() methods
        cy.contains('nb-card', 'Using the Grid').then( usingTheGridForm => {
            cy.wrap(usingTheGridForm).find('[for="inputEmail1"]').should('contain', 'Email')
            cy.wrap(usingTheGridForm).find('[for="inputPassword2"]').should('contain', 'Password')
        })


    })  

    it('extract text values', () => {
      cy.visit('/')
      cy.contains('Forms').click()
      cy.contains('Form Layouts').click()

      // 1  
      cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')
      
      //2
      cy.get('[for="exampleInputEmail1"]').then( label => {
        const labelText = label.text()
        expect(label.text()).to.equal('Email address')
        cy.wrap(label).should('contain', 'Email address')
      })

      //3
      cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
        expect(text).to.equal('Email address')
      })

      cy.get('[for="exampleInputEmail1"]').invoke('text').as('labelText').should('contain', 'Email address')

      //4

        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then( classValue => {
          expect(classValue).to.equal('label')
        })

        //5 Invoke property
        cy.get('#exampleInputEmail1').type('test@test.com')
        cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain', 'test@test.com').then( property => {
          expect(property).to.equal('test@test.com')
        })

    })

    it.only('radio buttons', () => {
      cy.visit('/')
      cy.contains('Forms').click()
      cy.contains('Form Layouts').click()

      cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons => {
        cy.wrap(radioButtons).eq(0).check({ force: true}).should('be.checked')
        cy.wrap(radioButtons).eq(1).check({ force: true})
        cy.wrap(radioButtons).eq(0).should('not.be.checked')
        cy.wrap(radioButtons).eq(2).should('be.disabled')
      })

    })

    it.only('Checkboxes', () => {
      cy.visit('/')
      cy.contains('Modal & Overlays').click()
      cy.contains('Toastr').click()

      cy.get('[type="checkbox"]').uncheck({ force: true })
      cy.get('[type="checkbox"]').eq(0).click({ force: true })
      cy.get('[type="checkbox"]').eq(1).check({ force: true })



    })

})
