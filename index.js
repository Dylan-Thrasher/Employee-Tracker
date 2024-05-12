const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
const userChoices = ['View All Employees', 'View All Roles', 'View All Departments', 'View Budget',
'Add Employee', 'Add Role', 'Add Department', 'Quit']

init();

// Display logo text, load main prompts
function init() {
  const logoText = logo({ name: "City of Pawnee" }).render();

  console.log(logoText);

  loadMainPrompts();
}

function loadMainPrompts() {
  prompt([
    // Created first question user will see- "What would you like to do?"
    {
      type: 'list',
      name: 'tracker',
      message: 'What would you like to do?',
      choices: trackerChoices,
    }
  ]).then((res) => {
    // Created a variable to store the user's choice
    let trackerChoice;
     //  Created a switch statement to call the appropriate response depending on what the user chose
    switch (res.trackerChoices) {
      // Created a case to View all employees
      case 'View All Employees':
        db.findAllEmployees().then((employees) => {
          console.table(employees.rows);
        }).then(() => {
          loadMainPrompts();
        })
        break;

      // BONUS- Create a function to View all employees that belong to a department
      // case value:

      //   break;
      // BONUS- Create a function to View all employees that report to a specific manager
      // case value:

      //   break;
      // BONUS- Create a function to Delete an employee
      // case value:

      //   break;
      // TODO- Create a function to Update an employee's role
      case  'Update Role for Employee':

        break;
      // BONUS- Create a function to Update an employee's manager
      // case value:

      //   break;
      // TODO- Create a function to View all roles
      case  'View All Roles':

        break;
      // TODO- Create a function to Add a role
      case 'Add Role':

        break;
      // BONUS- Create a function to Delete a role
      // case value:

      //   break;
      // TODO- Create a function to View all deparments
      case 'View All Departments':

        break;
      // TODO- Create a function to Add a department
      case 'Add Department':

        break;
      // BONUS- Create a function to Delete a department
      // case value:

      //   break;
      // BONUS- Create a function to View all departments and show their total utilized department budget
      case 'View Budget':

        break;
      // TODO- Create a function to Add an employee
      case 'Add Employee':

        break;

      case 'Quit':

        break;
    }
  });
}
// Exit the application
function quit() {
  console.log("Goodbye!");
  process.exit();
}