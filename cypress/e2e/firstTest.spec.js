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

    it('radio buttons', () => {
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

    it('Checkboxes', () => {
      cy.visit('/')
      cy.contains('Modal & Overlays').click()
      cy.contains('Toastr').click()

      cy.get('[type="checkbox"]').uncheck({ force: true })
      cy.get('[type="checkbox"]').eq(0).click({ force: true })
      cy.get('[type="checkbox"]').eq(1).check({ force: true })



    })

    it('Datepicker', () => {
      cy.visit('/');
      cy.contains('Forms').click();
      cy.contains('Datepicker').click();
    
      function selectDayFromCurrentMonth() {
        let date = new Date();
        date.setDate(date.getDate() + 1);
        let futureDay = date.getDate();
        let futureMonth = date.toLocaleString('en-US', { month: 'short' });
        let futureYear = date.getFullYear();
        let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`;
    
        cy.get('nb-calendar-navigation')
          .invoke('attr', 'ng-reflect-date')
          .then((dateAttribute) => {
            if (!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)) {
              cy.get('[data-name="chevron-right"]').click().then(() => {
                selectDayFromCurrentMonth();
              });
            } else {
              cy.get('day-cell').not('.bounding-month').contains(futureDay).click();
            }
          });
    
        return dateToAssert;
      }
    
      cy.contains('nb-card', 'Common Datepicker')
        .find('input')
        .then((input) => {
          cy.wrap(input).click();
          let dateToAssert = selectDayFromCurrentMonth();
          cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert);
          cy.wrap(input).should('have.value', dateToAssert);
        });
    });
    
    it('Lists and dropdowns', () => {

      cy.visit('/');

      cy.get('nav nb-select').click();
      cy.get('.options-list').contains('Dark').click();
      cy.get('nav nb-select').should('contain', 'Dark');

      cy.get('nab nb-select').then( dropDown => {
        cy.wrap(dropDown).click();
        cy.get('.options-list nb-option').each( (listItem, index) => {
          const itemText = listItem.text().trim();
          cy.wrap(listItem).click();
          cy.wrap(dropDown).should('contain', itemText);
          if(index < 3) {
            cy.wrap(dropDown).click();
          }
        })

    })

    it.only('Web tables', () => {
      cy.visit('/');
      cy.contains('Tables & Data').click();
      cy.contains('Smart Table').click();

      // 1
      cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
        cy.wrap(tableRow).find('.nb-edit').click();
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25');
        cy.wrap(tableRow).find('.nb-checkmark').click();
        cy.wrap(tableRow).find('td').eq(6).should('contain', '25');
      })
      // 2
      cy.get('thead').find('.nb-plus').click();
      cy.get('thead').find('tr').eq(2).then( tableRow => {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type('Tim');
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Smith');
        cy.wrap(tableRow).find('.nb-checkmark').click();
      }) 
      
      cy.get('tbody tr').first().find('td').then( tableColumns => {
        cy.wrap(tableColumns).eq(2).should('contain', 'Tim');
        cy.wrap(tableColumns).eq(3).should('contain', 'Smith');
      } )
    })
  })
})
