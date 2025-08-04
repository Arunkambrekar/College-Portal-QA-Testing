# College-Portal-QA-Testing

A complete end-to-end QA project that simulates industry-level testing workflows using both manual and automated testing approaches for the College Parents Portal web application.

---

## Project Title

**End-to-End QA and Automation of a College Parents Portal using Cypress, Jira, and Zephyr**

---

## Project Overview

This project aims to implement a comprehensive QA process for the College Parents Portal—an educational platform that allows parents to monitor their child’s academic performance and attendance.

Two core modules were tested:
- Login Module
- Dashboard/Profile Module

Both manual testing and Cypress-based automation were used to ensure functionality, reliability, accessibility, and maintainability. Tools such as Jira, Zephyr Scale, Allure, cypress-axe, and GitHub were integrated to simulate real-world testing environments. The goal is to mirror how professional QA teams work in real projects.

---

## Tech Stack and Tools Used

| Category           | Tools and Technologies                       |
|--------------------|----------------------------------------------|
| Test Automation    | Cypress (v14.5.3)                            |
| Manual Test Management | Jira + Zephyr Scale (Cloud)            |
| Reporting Tools    | Allure, Cypress HTML Reporter (Mochawesome) |
| Accessibility Testing | cypress-axe (WCAG 2.1 compliant)         |
| Version Control    | Git + GitHub                                 |
| Development IDE    | Visual Studio Code                           |
| Browser            | Google Chrome (latest stable)               |
| Package Manager    | Node.js with npm                             |

---

## Folder Structure

College-Portal-QA-Testing/
│
├── Automation testing/
│ └── Login_module/
│ ├── cypress/
│ │ ├── e2e/ # Cypress test cases
│ │ ├── fixtures/ # Test data (JSON)
│ │ └── support/ # Helper files (POM)
│ ├── cypress.config.js
│ ├── package.json
│ └── .gitignore
│
├── Manual testing/
│ └── Login_module_manual_testing/
│ ├── CollegePortal_LoginModule_Valid_TestCases.xlsx
│ ├── CollegePortal_LoginModule_InValid_TestCases.xlsx
│ └── Bug_Report_Jira_Screenshots/
│
├── README.md
└── REFERENCES.md



---

## How to Run Automation Tests

1. Open terminal and navigate to the project folder:

```bash
cd Automation\ testing/Login_module

2. Install all dependencies:
bash 
npm install

3.Run tests using the Cypress Test Runner GUI:
bash
npx cypress open

4. Or run tests headlessly:
bash
npx cypress run

5.To generate Allure reports:
bash
npm run allure:generate

## Testing Scope
|Sprint	Module|	Test Cases|	Automation|	Tools Used|	Status|
|1|	Login	|27|	Cypress|	Jira, Zephyr, Allure, Axe|	Completed|
|2|	Dashboard/Profile|	20+|	In Progress|	Cypress (POM), Fixtures, Axe|	In Progress|

##Screenshots and Attachments
The following files and visuals are included in the repository:
Valid and Invalid Test Case Excel Sheets
Bug Report screenshots from Jira
Cypress HTML Reports
Allure Test Reports
Accessibility test results using cypress-axe
All assets are located in the Manual testing/ and Automation testing/ directories.

