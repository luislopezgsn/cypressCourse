/// <reference types="cypress" />
import FormLayoutsPage from '../pages/FormLayoutsPage';
import DatepickerPage from '../pages/DatepickerPage';
import TablesPage from '../pages/TablesPage';
import NavigationPage from '../pages/NavigationPage';

describe('Test Suite with Page Object Model', () => {
  const formLayoutsPage = new FormLayoutsPage();
  const datepickerPage = new DatepickerPage();
  const tablesPage = new TablesPage();
  const navigationPage = new NavigationPage();

  beforeEach(() => {
    cy.visit('/');
  });

  it('First Test - Selectors', () => {
    navigationPage.goToFormLayouts();
    formLayoutsPage.verifySelectors();
  });

  it('Second Test - Form Interactions', () => {
    navigationPage.goToFormLayouts();
    formLayoutsPage.verifyFormInteractions();
  });

  it('Save the subject of the command', () => {
    navigationPage.goToFormLayouts();
    formLayoutsPage.verifyGridLabels();
  });

  it('Extract text values', () => {
    navigationPage.goToFormLayouts();
    formLayoutsPage.extractTextValues();
  });

  it('Radio buttons', () => {
    navigationPage.goToFormLayouts();
    formLayoutsPage.verifyRadioButtons();
  });

  it('Checkboxes', () => {
    navigationPage.goToToastr();
    formLayoutsPage.verifyCheckboxes();
  });

  it('Datepicker', () => {
    navigationPage.goToDatepicker();
    datepickerPage.selectFutureDate();
  });

  it('Lists and dropdowns', () => {
    navigationPage.verifyThemeSelection();
  });

  it('Web tables', () => {
    navigationPage.goToSmartTable();
    tablesPage.editUserAge('Larry', 25);
    tablesPage.addNewUser('Tim', 'Smith');
    tablesPage.verifyFilteredAges([20, 30, 40, 200]);
  });
});
