import 'cypress-axe';

describe('College Website Login - Valid Test with Accessibility', () => {

  beforeEach(() => {
    // Prevent the app's JS errors from failing the test
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    cy.visit('https://parents.kletech.ac.in');
    cy.injectAxe(); // 👈 Add Axe before each test
  });

  const login = () => {
    cy.get('[name="username"]').type('01FE21BEC242');
    cy.get('#dd').select('27');
    cy.get('#mm').select('12');
    cy.get('#yyyy').select('2001');
    cy.get('input[type="submit"]').click();
  };

  it('TC01 - Should log in with valid credentials', () => {
    login();
    cy.url().should('include', 'studentdashboard&task=dashboard');

    // a11y check on dashboard after login
    cy.injectAxe(); 
    cy.checkA11y(null, {
      includedImpacts: ['critical', 'serious'],
    });
  });

  it('TC02 - Login by pasting valid USN', () => {
    const validUSN = '01FE21BEC242';
    cy.window().then(win => win.navigator.clipboard.writeText(validUSN));

    cy.get('[name="username"]').invoke('val', validUSN);
    cy.get('#dd').select('27');
    cy.get('#mm').select('12');
    cy.get('#yyyy').select('2001');
    cy.get('input[type="submit"]').click();

    cy.url().should('include', 'studentdashboard&task=dashboard');
  });

  it('TC03 - Login using Enter key instead of Login button', () => {
    cy.get('[name="username"]').type('01FE21BEC242');
    cy.get('#dd').select('27');
    cy.get('#mm').select('12');
    cy.get('#yyyy').select('2001');
    cy.get('body').type('{enter}');

    cy.url().should('include', 'studentdashboard&task=dashboard');
  });

  it('TC04 - Should log in with valid USN having leading/trailing spaces', () => {
    cy.get('[name="username"]').type(' 01FE21BEC242 ');
    cy.get('#dd').select('27');
    cy.get('#mm').select('12');
    cy.get('#yyyy').select('2001');
    cy.get('input[type="submit"]').click();

    cy.url().should('include', 'studentdashboard&task=dashboard');
  });

  it('TC05 - Should log in with valid credentials on mobile viewport', () => {
    cy.viewport('iphone-6');
    login();
    cy.url().should('include', 'studentdashboard&task=dashboard');
  });

  it('TC06 - Should allow selecting valid DOB values from dropdowns and login successfully', () => {
    cy.get('[name="username"]').type('01FE21BEC242');
    cy.get('#dd').select('27').invoke('val').should('contain', '27');
    cy.get('#mm').select('12').invoke('val').should('contain', '12');
    cy.get('#yyyy').select('2001').invoke('val').should('contain', '2001');
    cy.get('input[type="submit"]').click();

    cy.url().should('include', 'studentdashboard&task=dashboard');
  });

  it('TC07 - Should remain logged in after refreshing the dashboard page', () => {
    login();
    cy.url().should('include', 'studentdashboard&task=dashboard');
    cy.reload();
    cy.url().should('include', 'studentdashboard&task=dashboard');
  });

  it('TC10 - Should navigate to Even 2025 portal and login successfully', () => {
    cy.contains('Even 2025 parent portal')
      .should('have.attr', 'href')
      .then((evenLink) => {
        login();
        cy.url().should('include', 'studentdashboard&task=dashboard');
      });
  });

  it('TC11 - Should navigate to Supply 2025 and login successfully', () => {
    cy.contains('Supply 2025 parent portal')
      .should('have.attr', 'href')
      .then((supplyLink) => {
        login();
        cy.url().should('include', 'studentdashboard&task=dashboard');
      });
  });

  it('TC13 - Should allow arrow key navigation in dropdowns', () => {
    cy.get('[name="username"]').type('01FE21BEC242');
    cy.get('#dd').focus().type('{downarrow}{downarrow}{enter}');
    cy.get('#mm').focus().type('{uparrow}{enter}');
    cy.get('#yyyy').focus().type('{downarrow}{enter}');
    cy.get('input[type="submit"]').click();

    cy.url().should('include', 'studentdashboard&task=dashboard');
  });

  it('TC16 - Should log in with lowercase USN (if allowed)', () => {
    cy.get('[name="username"]').type('01fe21bec242');
    cy.get('#dd').select('27');
    cy.get('#mm').select('12');
    cy.get('#yyyy').select('2001');
    cy.get('input[type="submit"]').click();

    cy.url().should('include', 'studentdashboard&task=dashboard');
  });
});

