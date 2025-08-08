import 'cypress-axe';

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Invalid Login Tests with Accessibility', () => {

  beforeEach(() => {
    cy.visit('https://parents.kletech.ac.in/');
    cy.injectAxe(); // Load axe for a11y testing
  });

  const checkModalA11y = () => {
    cy.get('.modal-content').should('exist');
    cy.checkA11y('.modal-content', {
      includedImpacts: ['critical', 'serious']
    });
  };

  it('TC01 - Incorrect Username and Valid DOB', () => {
    cy.get('#username').type('wronguser123');
    cy.get('#dd').select('27');
    cy.get('#mm').select('12');
    cy.get('#yyyy').select('2001');
    cy.get('input[type="submit"]').click();

    cy.get('.modal-content').should('exist').within(() => {
      cy.get('h3').should('contain.text', 'Login Failed');
      cy.get('p').invoke('text').then((text) => {
        const cleaned = text.trim();
        expect(
          cleaned.includes('invalid USN or password') ||
          cleaned.includes('Too many failed login attempts') ||
          cleaned.includes('try again after')
        ).to.be.true;
      });
    });

    checkModalA11y();
  });

  it('TC02 - Valid Username, Incorrect DOB', () => {
    cy.get('#username').type('01fe21bec242');
    cy.get('#dd').select('01');
    cy.get('#mm').select('01');
    cy.get('#yyyy').select('1999');
    cy.get('input[type="submit"]').click();

    cy.get('.modal-content').should('exist').within(() => {
      cy.get('h3').should('contain.text', 'Login Failed');
      cy.get('p').invoke('text').then((text) => {
        const cleaned = text.trim();
        expect(
          cleaned.includes('invalid USN or password') ||
          cleaned.includes('Too many failed login attempts') ||
          cleaned.includes('try again after')
        ).to.be.true;
      });
    });

    checkModalA11y();
  });

  it('TC03 - Both USN and DOB left empty', () => {
    cy.get('input[type="submit"]').click();

    cy.get('.modal-content').should('exist').within(() => {
      cy.get('h3').should('contain.text', 'Login Failed');
      cy.get('p').invoke('text').then((text) => {
        const cleaned = text.trim();
        expect(
          cleaned.includes('Please enter your University Seat Number') ||
          cleaned.includes('invalid USN or password') ||
          cleaned.includes('Too many failed login attempts') ||
          cleaned.includes('try again after')
        ).to.be.true;
      });
    });

    checkModalA11y();
  });

  it('TC04 - USN entered, DOB left empty', () => {
    cy.get('#username').type('01fe21bec242');
    cy.get('input[type="submit"]').click();

    cy.get('.modal-content').should('exist').within(() => {
      cy.get('h3').should('contain.text', 'Login Failed');
      cy.get('p').invoke('text').then((text) => {
        const cleaned = text.trim();
        expect(
          cleaned.includes('invalid USN or password') ||
          cleaned.includes('Too many failed login attempts') ||
          cleaned.includes('try again after')
        ).to.be.true;
      });
    });

    checkModalA11y();
  });

  it('TC05 - SQL Injection in USN', () => {
    cy.get('#username').type("' OR 1=1--");
    cy.get('#dd').select('27');
    cy.get('#mm').select('12');
    cy.get('#yyyy').select('2001');
    cy.get('input[type="submit"]').click();

    cy.get('.modal-content').should('exist').within(() => {
      cy.get('h3').should('contain.text', 'Login Failed');
      cy.get('p').invoke('text').then((text) => {
        const cleaned = text.trim();
        expect(
          cleaned.includes('invalid USN or password') ||
          cleaned.includes('Too many failed login attempts') ||
          cleaned.includes('try again after')
        ).to.be.true;
      });
    });

    checkModalA11y();
  });

  it('TC06 - Valid USN with Empty DOB', () => {
    cy.get('#username').type('01fe21bec242');
    cy.get('input[type="submit"]').click();

    cy.get('.modal-content').should('exist').within(() => {
      cy.get('h3').should('contain.text', 'Login Failed');
      cy.get('p').invoke('text').then((text) => {
        const cleaned = text.trim();
        expect(
          cleaned.includes('invalid USN or password') ||
          cleaned.includes('Too many failed login attempts') ||
          cleaned.includes('try again after')
        ).to.be.true;
      });
    });

    checkModalA11y();
  });

  it('TC07 - XSS Attempt in USN', () => {
    cy.get('#username').type('<script>alert(1)</script>');
    cy.get('#dd').select('27');
    cy.get('#mm').select('12');
    cy.get('#yyyy').select('2001');
    cy.get('input[type="submit"]').click();

    cy.get('.modal-content').should('exist').within(() => {
      cy.get('h3').should('contain.text', 'Login Failed');
      cy.get('p').invoke('text').then((text) => {
        const cleaned = text.trim();
        expect(
          cleaned.includes('invalid USN or password') ||
          cleaned.includes('Too many failed login attempts') ||
          cleaned.includes('try again after')
        ).to.be.true;
      });
    });

    checkModalA11y();
  });

  it('TC10 - Login with DOB 01/01/1900', () => {
    cy.get('#username').type('01fe21bec242');
    cy.get('#dd').select('01');
    cy.get('#mm').select('01');
    cy.get('#yyyy').then(($el) => {
      if ($el.find('option[value="1900"]').length > 0) {
        cy.get('#yyyy').select('1900');
        cy.get('input[type="submit"]').click();

        cy.get('.modal-content').should('exist').within(() => {
          cy.get('h3').should('contain.text', 'Login Failed');
          cy.get('p').invoke('text').then((text) => {
            const cleaned = text.trim();
            expect(
              cleaned.includes('invalid USN or password') ||
              cleaned.includes('Too many failed login attempts') ||
              cleaned.includes('try again after')
            ).to.be.true;
          });
        });

        checkModalA11y();
      } else {
        cy.log('✅ Year 1900 not available (handled gracefully)');
      }
    });
  });

  it('TC12 - USN with special symbols', () => {
    cy.get('#username').type('01FE@21#BEC!');
    cy.get('#dd').select('27');
    cy.get('#mm').select('12');
    cy.get('#yyyy').select('2001');
    cy.get('input[type="submit"]').click();

    cy.get('.modal-content').should('exist').within(() => {
      cy.get('h3').should('contain.text', 'Login Failed');
      cy.get('p').invoke('text').then((text) => {
        const cleaned = text.trim();
        expect(
          cleaned.includes('invalid USN or password') ||
          cleaned.includes('Too many failed login attempts') ||
          cleaned.includes('try again after')
        ).to.be.true;
      });
    });

    checkModalA11y();
  });
});
