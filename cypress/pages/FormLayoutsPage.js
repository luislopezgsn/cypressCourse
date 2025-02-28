class FormLayoutsPage {
  verifySelectors() {
      cy.get('body').debug();

      cy.get('#exampleInputEmail1', { timeout: 10000 })
          .should('be.visible')
          .then(() => {
              cy.log('Element found!');
          });

      cy.get('[placeholder="Email"]', { timeout: 10000 }).should('be.visible');
  }

  verifyFormInteractions() {
      cy.contains('Sign in');
      cy.contains('[status="warning"]', 'Sign in');
      cy.contains('nb-card', 'Horizontal form').find('button');
      cy.get('#inputEmail3')
          .parents('form')
          .find('button')
          .should('contain', 'Sign in')
          .parents('form')
          .find('nb-checkbox')
          .click({ force: true });
  }

  verifyGridLabels() {
      cy.contains('nb-card', 'Using the Grid').as('usingTheGrid');

      // Log the structure of "Using the Grid" card
      cy.get('@usingTheGrid').debug();
      cy.wait(500);

      // Check if any label exists
      cy.get('@usingTheGrid')
          .find('*') // Get all child elements
          .each(($el) => {
              cy.log($el.prop('tagName') + ' -> ' + $el.text()); // Log tag name and text
          });

      // Try selecting text directly instead of relying on the "for" attribute
      cy.get('@usingTheGrid')
          .contains('Email', { timeout: 10000 }) // Find any element with text "Email"
          .should('be.visible');

      cy.get('@usingTheGrid')
          .contains('Password', { timeout: 10000 })
          .should('be.visible');
  }

  extractTextValues() {
      cy.contains('Email address').should('be.visible');
      cy.get('#exampleInputEmail1').type('test@test.com');
      cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain', 'test@test.com');
  }

  verifyRadioButtons() {
      cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
          cy.wrap(radioButtons).eq(0).check({ force: true }).should('be.checked');
          cy.wrap(radioButtons).eq(1).check({ force: true });
          cy.wrap(radioButtons).eq(0).should('not.be.checked');
          cy.wrap(radioButtons).eq(2).should('be.disabled');
      });
  }

  verifyCheckboxes() {
      cy.get('[type="checkbox"]').uncheck({ force: true });
      cy.get('[type="checkbox"]').eq(0).click({ force: true });
      cy.get('[type="checkbox"]').eq(1).check({ force: true });
  }
}

export default FormLayoutsPage;
