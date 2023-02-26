# jpmc
 Cypress version installed is 9.7.0
 Tests are configured to run in scripts in Chrome browser
 To run the test in headless mode, clean previous reports and generate the final reports run the command "npm run execute:headless"
 To run in headed mode clean previous reports and generate the final reports run the command "npm run execute:headed"
 

 Framework Structure
     Fixtures       ---> Test Data.
     Pages          ---> The elements in each page with which the test interacts.
     Integration    ---> The tests.
     Utilites       ---> All helper methods.
     cypress.json   ---> Cypress related flags including baseUrl,Screenshots.
     reports        ---> Mochawesome reports.
