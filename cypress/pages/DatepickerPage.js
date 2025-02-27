class DatepickerPage {
  selectFutureDate() {
    cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
      cy.wrap(input).scrollIntoView().click({ force: true });

      let date = new Date();
      date.setDate(date.getDate() + 1);
      let futureDay = date.getDate();
      let futureMonth = date.toLocaleString('en-US', { month: 'short' });
      let futureYear = date.getFullYear();
      let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`;

      cy.log('🔵 Expected Date:', dateToAssert);

      // Wait for datepicker to open
      cy.get('nb-calendar-day-picker', { timeout: 5000 }).should('be.visible');

      function selectDate() {
        cy.get('nb-calendar-navigation')
          .invoke('attr', 'ng-reflect-date')
          .then(dateAttribute => {
            cy.log('🟢 Current Calendar Header:', dateAttribute);

            if (!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)) {
              cy.get('[data-name="chevron-right"]').click();
              
              // Wait for the next month to appear before proceeding
              cy.get('nb-calendar-navigation')
                .invoke('attr', 'ng-reflect-date')
                .should('include', futureMonth)
                .should('include', futureYear)
                .then(() => {
                  selectDate();
                });
            } else {
              cy.wait(1000); // Ensure calendar updates fully
              
              cy.get('nb-calendar-day-picker')
                .find('nb-calendar-day-cell')
                .should('exist')
                .contains(futureDay)
                .click();
            }
          });
      }

      selectDate();

      // Ensure the selected date appears in the input field
      cy.wrap(input)
        .invoke('prop', 'value')
        .should('contain', dateToAssert);
    });
  }
}

export default DatepickerPage;
