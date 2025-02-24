class DatepickerPage {
    selectFutureDate() {
      cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
        cy.wrap(input).click();
  
        let date = new Date();
        date.setDate(date.getDate() + 1);
        let futureDay = date.getDate();
        let futureMonth = date.toLocaleString('en-US', { month: 'short' });
        let futureYear = date.getFullYear();
        let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`;
  
        cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
          if (!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)) {
            cy.get('[data-name="chevron-right"]').click().then(() => {
              this.selectFutureDate();
            });
          } else {
            cy.get('day-cell').not('.bounding-month').contains(futureDay).click();
          }
        });
  
        cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert);
      });
    }
  }
  
  export default DatepickerPage;
  