Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Invalid Login Tests', () => {
  it('TC01 - Incorrect Username and Valid DOB (with dynamic lockout handling)', () => {
    cy.visit('https://parents.kletech.ac.in/');

    // Enter invalid username and valid DOB
    cy.get('#username').type('wronguser123');
    cy.get('#dd').select('27');
    cy.get('#mm').select('12');
    cy.get('#yyyy').select('2001');

    // Click login
    cy.get('input[type="submit"]').click();

    // Wait for modal and handle dynamic error message
    cy.get('.modal-content').should('exist').within(() => {
      // Always expect Login Failed title
      cy.get('h3').should('contain.text', 'Login Failed');

      // Flexible error message assertion
      cy.get('p').invoke('text').then((text) => {
        const cleaned = text.trim();
        expect(
          cleaned.includes('invalid USN or password') ||
          cleaned.includes('Too many failed login attempts') ||
          cleaned.includes('try again after')
        ).to.be.true;
      });
    });
  });


  it('TC02 - Valid Username, Incorrect DOB', () => {
  cy.visit('https://parents.kletech.ac.in/');

  cy.get('#username').type('01fe21bec242');
  cy.get('#dd').select('01');
  cy.get('#mm').select('01');
  cy.get('#yyyy').select('1999'); // Incorrect DOB

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
});

 it('TC03 - Both USN and DOB left empty', () => {
    cy.visit('https://parents.kletech.ac.in/');

    // Do not enter USN or select DOB — leave all blank

    // Click Login
    cy.get('input[type="submit"]').click();

    // Assert modal appears with any of the expected messages
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
  });

  



   it('TC04 - USN entered, DOB left empty', () => {
    cy.visit('https://parents.kletech.ac.in/');

    // Enter only USN
    cy.get('#username').type('01fe21bec242');

    // Leave DOB dropdowns empty (skip select)

    // Click Login
    cy.get('input[type="submit"]').click();

    // Modal validation (same structure as TC01)
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
});

it("TC05 - SQL Injection Attempt in USN field", () => {
    cy.visit('https://parents.kletech.ac.in/');

    // Enter SQL injection payload
    cy.get('#username').type("' OR 1=1--");
    cy.get('#dd').select('27');
    cy.get('#mm').select('12');
    cy.get('#yyyy').select('2001');

    // Submit form
    cy.get('input[type="submit"]').click();

    // Verify modal message (flexible check)
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
  });

  it('TC06 - Valid USN with Empty DOB', () => {
    cy.visit('https://parents.kletech.ac.in/');

    // Enter valid USN
    cy.get('#username').type('01fe21bec242');

    // Leave DOB blank

    // Submit form
    cy.get('input[type="submit"]').click();

    // Check for error modal
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
  });


  it('TC07 - XSS Attempt in USN field', () => {
    cy.visit('https://parents.kletech.ac.in/');

    // Enter XSS payload
    cy.get('#username').type('<script>alert(1)</script>');
    cy.get('#dd').select('27');
    cy.get('#mm').select('12');
    cy.get('#yyyy').select('2001');

    // Submit login
    cy.get('input[type="submit"]').click();

    // Verify modal appears and handles input safely
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
  });

  it('TC08 - USN with leading/trailing spaces (should succeed)', () => {
  cy.visit('https://parents.kletech.ac.in/');

  cy.get('#username').type('   01fe21bec242   ');
  cy.get('#dd').select('27');
  cy.get('#mm').select('12');
  cy.get('#yyyy').select('2001');

  cy.get('input[type="submit"]').click();

  // ✅ Expect to land on dashboard
  cy.url().should('include', 'studentdashboard&task=dashboard');
});

 
 it('TC09 - Lowercase USN with Valid DOB (should succeed)', () => {
    cy.visit('https://parents.kletech.ac.in/');

    cy.get('#username').type('01fe21bec242'); // lowercase
    cy.get('#dd').select('27');
    cy.get('#mm').select('12');
    cy.get('#yyyy').select('2001');

    cy.get('input[type="submit"]').click();

    // ✅ Correct assertion: check for dashboard pattern in the URL
    cy.url().should('include', 'studentdashboard&task=dashboard');
  });

  it('TC10 - Attempt login with DOB set to 01/01/1900', () => {
    cy.visit('https://parents.kletech.ac.in/');

    // Enter valid USN
    cy.get('#username').type('01fe21bec242');

    // Try selecting boundary DOB (if allowed)
    cy.get('#dd').select('01');
    cy.get('#mm').select('01');
    cy.get('#yyyy').then(($yearSelect) => {
      if ($yearSelect.find('option[value="1900"]').length > 0) {
        cy.get('#yyyy').select('1900');

        // Submit form
        cy.get('input[type="submit"]').click();

        // Assert expected modal
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
      } else {
        cy.log('Year 1900 is not present in dropdown — boundary protected ✅');
      }
    });
  });

  it('TC11 - Wrong login then correct login without refresh', () => {
    cy.visit('https://parents.kletech.ac.in/');

    // 🔴 Step 1: Wrong USN first
    cy.get('#username').type('wronguser123');
    cy.get('#dd').select('27');
    cy.get('#mm').select('12');
    cy.get('#yyyy').select('2001');
    cy.get('input[type="submit"]').click();

    // 🧾 Step 2: Wait for modal and check error message (flexible)
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

    // 🧼 Step 3: Close the modal (if close button exists)
    cy.get('.modal-content .close, .modal-content button.close')
      .click({ force: true })
      .wait(500);

    // ✅ Step 4: Enter valid USN without refreshing
    cy.get('#username').clear().type('01fe21bec242');
    cy.get('#dd').select('27');
    cy.get('#mm').select('12');
    cy.get('#yyyy').select('2001');
    cy.get('input[type="submit"]').click();

    // 🎯 Step 5: Expect dashboard URL (success)
    cy.url().should('include', 'studentdashboard&task=dashboard');
  });

  it('TC12 - Attempt login with symbols in USN', () => {
    cy.visit('https://parents.kletech.ac.in/');

    // Input USN with special characters
    cy.get('#username').type('01FE@21#BEC!');
    cy.get('#dd').select('27');
    cy.get('#mm').select('12');
    cy.get('#yyyy').select('2001');
    cy.get('input[type="submit"]').click();

    // Expect modal with flexible error text
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
  });
});


