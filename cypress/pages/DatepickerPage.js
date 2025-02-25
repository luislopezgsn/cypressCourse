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

          // Wait for the datepicker to fully load
          cy.get('nb-calendar-day-picker', { timeout: 5000 }).should('be.visible');

          cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
              if (!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)) {
                  cy.get('[data-name="chevron-right"]').click().then(() => {
                      this.selectFutureDate();
                  });
              } else {
                  // Ensure day-cell is found before clicking
                  cy.get('day-cell').then($cells => {
                      if ($cells.length === 0) {
                          throw new Error("No day-cell elements found!");
                      }
                  });
                  cy.get('day-cell').should('exist').not('.bounding-month').contains(futureDay).click();
              }
          });

          cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert);
      });
  }
}

export default DatepickerPage;