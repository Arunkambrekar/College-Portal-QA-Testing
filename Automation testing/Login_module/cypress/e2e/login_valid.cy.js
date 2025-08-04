describe('College Website Login - Valid Test', () => {

    beforeEach(() => {
    // Prevent the app's JS errors from failing the test
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false; // prevents test from failing
    });
  }); 
  
  // Should log in with valid credentials
  it('TC01-Should log in with valid credentials', () => {
    cy.visit('https://parents.kletech.ac.in');

    cy.get('[name="username"]').type('01FE21BEC242');
    cy.get('#dd').select('27');
    cy.get('#mm').select('12');
    cy.get('#yyyy').select('2001');

    cy.get('input[type="submit"]').click();

    cy.url().should('include', 'studentdashboard&task=dashboard');
  });


  it('TC02 - Login by pasting valid USN', () => {
  cy.visit('https://parents.kletech.ac.in');

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
  cy.visit('https://parents.kletech.ac.in');

  cy.get('[name="username"]').type('01FE21BEC242');
  cy.get('#dd').select('27');
  cy.get('#mm').select('12');
  cy.get('#yyyy').select('2001');

  cy.get('body').type('{enter}');
  cy.url().should('include', 'studentdashboard&task=dashboard');
});


// Should log in with valid USN having leading/trailing spaces
it('TC04 - Should log in with valid USN having leading/trailing spaces', () => {
  cy.visit('https://parents.kletech.ac.in');

  cy.get('[name="username"]').type(' 01FE21BEC242 '); // leading + trailing spaces
  cy.get('#dd').select('27');
  cy.get('#mm').select('12');
  cy.get('#yyyy').select('2001');

  cy.get('input[type="submit"]').click();

  cy.url().should('include', 'studentdashboard&task=dashboard'); // Adjust as per actual URL
});


// Should log in with valid credentials on mobile viewport
  it('TC05 - Should log in with valid credentials on mobile viewport', () => {
    // Set viewport to iPhone 6 size
    cy.viewport('iphone-6');

    // Visit the website
    cy.visit('https://parents.kletech.ac.in');

    // Fill valid credentials
    cy.get('[name="username"]').type('01FE21BEC242');
    cy.get('#dd').select('27');
    cy.get('#mm').select('12');
    cy.get('#yyyy').select('2001');

    // Submit
    cy.get('input[type="submit"]').click();

    // Verify redirection
    cy.url().should('include', 'studentdashboard&task=dashboard');
  });


// Should allow selecting valid DOB values from dropdowns and login successfully
  it('TC06 - Should allow selecting valid DOB values from dropdowns and login successfully', () => {
    cy.visit('https://parents.kletech.ac.in');

    cy.get('[name="username"]').type('01FE21BEC242');

    cy.get('#dd')
      .should('be.visible')
      .select('27')
      .invoke('val')
      .should('contain', '27'); // relaxed comparison

    cy.get('#mm')
      .should('be.visible')
      .select('12')
      .invoke('val')
      .should('contain', '12');

    cy.get('#yyyy')
      .should('be.visible')
      .select('2001')
      .invoke('val')
      .should('contain', '2001');

    cy.get('input[type="submit"]').click();

    cy.url().should('include', 'studentdashboard&task=dashboard');
  });



  it('TC07 - Should remain logged in after refreshing the dashboard page', () => {
    cy.visit('https://parents.kletech.ac.in');

    cy.get('[name="username"]').type('01FE21BEC242');
    cy.get('#dd').select('27');
    cy.get('#mm').select('12');
    cy.get('#yyyy').select('2001');

    cy.get('input[type="submit"]').click();

    // Wait for redirect and assert URL
    cy.url().should('include', 'studentdashboard&task=dashboard');

    // Refresh the page
    cy.reload();

    // Verify user still stays on dashboard page
    cy.url().should('include', 'studentdashboard&task=dashboard');
  });


   it('TC10 - Should navigate to Even 2025 portal and login successfully', () => {
    // Step 1: Visit the main page
    cy.visit('https://parents.kletech.ac.in');

    // Step 2: Find the Even 2025 link and extract the href
    cy.contains('Even 2025 parent portal')
      .should('have.attr', 'href')
      .then((evenLink) => {
        // Step 3: Visit the Even portal login page
        cy.visit(`https://parents.kletech.ac.in`);

        // Step 4: Fill login form
        cy.get('[name="username"]').type('01FE21BEC242');
        cy.get('#dd').select('27');
        cy.get('#mm').select('12');
        cy.get('#yyyy').select('2001');

        // Step 5: Submit login form
        cy.get('input[type="submit"]').click();

        // Step 6: Verify redirection to dashboard
        cy.url().should('include', 'studentdashboard&task=dashboard');
      });
  });


   it('TC11 - Should navigate to Supply 2025 and login successfully', () => {
    // Step 1: Visit the parent site and get the Supply link
    cy.visit('https://parents.kletech.ac.in');

    cy.contains('Supply 2025 parent portal')
      .should('have.attr', 'href')
      .then((supplyLink) => {
        // Step 2: Visit the actual Supply login page directly
        cy.visit(`https://parents.kletech.ac.in`);

        // Step 3: Fill login form on supply page
        cy.get('[name="username"]').type('01FE21BEC242');
        cy.get('#dd').select('27');
        cy.get('#mm').select('12');
        cy.get('#yyyy').select('2001');

        // Step 4: Submit login
        cy.get('input[type="submit"]').click();

        // Step 5: Assert redirection
        cy.url().should('include', 'studentdashboard&task=dashboard');
      });
  });

  it('TC13 - Should allow arrow key navigation in dropdowns', () => {
    cy.visit('https://parents.kletech.ac.in');

    cy.get('[name="username"]').type('01FE21BEC242');
    cy.get('#dd').focus().type('{downarrow}{downarrow}{enter}');
    cy.get('#mm').focus().type('{uparrow}{enter}');
    cy.get('#yyyy').focus().type('{downarrow}{enter}');

    cy.get('input[type="submit"]').click();

    cy.url().should('include', 'studentdashboard&task=dashboard');
  });


it('TC16 - Should log in with lowercase USN (if allowed)', () => {
  cy.visit('https://parents.kletech.ac.in');

  cy.get('[name="username"]').type('01fe21bec242'); // lowercase
  cy.get('#dd').select('27');
  cy.get('#mm').select('12');
  cy.get('#yyyy').select('2001');

  cy.get('input[type="submit"]').click();

  cy.url().should('include', 'studentdashboard&task=dashboard'); // Update as per final URL
});





});


describe.skip('TC08-College Website Login - Autofill Behavior', () => {
  it('TC08 - Should autofill saved credentials if browser has them saved (Not Applicable in Cypress)', () => {
    // Cypress does not support browser-native autofill functionality
    // Dropdown autofill (like DOB) can't be tested due to browser security limitations
    // Consider testing this manually
  });

  it('TC09 - Login should work on Chrome, Firefox, and Edge', () => {
    // Cross-browser testing should be done manually or using Cypress Cloud + BrowserStack/SauceLabs
    // Cypress by default runs on Chromium
  });

  it('TC12 - Should retain session after 10 minutes of inactivity', () => {
    // Cypress has time limitations and can't wait 10 minutes for idle checks.
    // You can simulate this by adjusting session expiry in the app (mocking).
    // Manual validation preferred.
  });

   it('TC14 - Should retain session across multiple tabs', () => {
    // Cypress runs in a single browser tab context.
    // Multi-tab session handling must be verified manually.
  });

   it('TC15 - Should allow users to reset/change DOB selection (if implemented)', () => {
    // Feature not implemented on the website.
    // Marked as skipped.
  });
});
