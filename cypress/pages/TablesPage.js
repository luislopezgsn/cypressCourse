class TablesPage {
  editUserAge(name, age) {
    cy.get('tbody').contains('tr', name).then(tableRow => {
      cy.get('nav.fixed').invoke('hide'); 

      cy.wrap(tableRow).find('.nb-edit')
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });

      cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age);

      cy.wrap(tableRow).find('.nb-checkmark')
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });

      cy.wait(500);

      cy.wrap(tableRow).find('td').eq(6).should('contain', age);
    });
  }

  addNewUser(firstName, lastName) {
    cy.get('nav.fixed').invoke('hide'); 

    cy.get('thead').find('.nb-plus')
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });

    cy.get('thead').find('tr').eq(2).then(tableRow => {
      cy.wrap(tableRow).find('[placeholder="First Name"]').type(firstName);
      cy.wrap(tableRow).find('[placeholder="Last Name"]').type(lastName);

      cy.wrap(tableRow).find('.nb-checkmark')
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });

      cy.wait(500);

      cy.get('tbody tr').first().find('td').then(tableColumns => {
        cy.wrap(tableColumns).eq(2).should('contain', firstName);
        cy.wrap(tableColumns).eq(3).should('contain', lastName);
      });
    });
  }

  verifyFilteredAges(ages) {
    cy.wrap(ages).each(age => {
      cy.get('thead [placeholder="Age"]').clear().type(age);
      cy.wait(650);
      cy.get('tbody tr').each(tableRow => {
        if (age === 200) {
          cy.wrap(tableRow).should('contain', 'No data found');
        } else {
          cy.wrap(tableRow).find('td').eq(6).should('contain', age);
        }
      });
    });
  }
}

export default TablesPage;
