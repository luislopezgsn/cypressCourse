class NavigationPage {
    goToFormLayouts() {
      cy.contains('Forms').click();
      cy.contains('Form Layouts').click();
    }
  
    goToDatepicker() {
      cy.contains('Forms').click();
      cy.contains('Datepicker').click();
    }
  
    goToToastr() {
      cy.contains('Modal & Overlays').click();
      cy.contains('Toastr').click();
    }
  
    goToSmartTable() {
      cy.contains('Tables & Data').click();
      cy.contains('Smart Table').click();
    }
  
    verifyThemeSelection() {
      cy.get('nav nb-select').click();
      cy.get('.options-list').contains('Dark').click();
      cy.get('nav nb-select').should('contain', 'Dark');
  
      cy.get('nav nb-select').then(dropDown => {
        cy.wrap(dropDown).click();
        cy.get('.options-list nb-option').each((listItem, index) => {
          const itemText = listItem.text().trim();
          cy.wrap(listItem).click();
          cy.wrap(dropDown).should('contain', itemText);
          if (index < 3) {
            cy.wrap(dropDown).click();
          }
        });
      });
    }
  }
  
  export default NavigationPage;
  