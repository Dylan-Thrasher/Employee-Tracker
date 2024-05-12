const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
const userChoices = ['Show All Employees', 'Show All Roles', 'Show All Departments', 'Show Budget', 'Show Employee Department', 'Show Employee Manager',
  'Add Employee', 'Add Role', 'Add Department',
  'Update Role for Employee', 'Update Manager for Employee',
  'Remove Employee', 'Remove Role', 'Remove Department', 'Quit']

init();

// Display logo text, load main prompts
function init() {
  const logoText = logo({ name: "City of Pawnee" }).render();

  console.log(logoText);

  loadMainPrompts();
}

function loadMainPrompts() {
  prompt([
    // TODO- Create first question user will see- "What would you like to do?"
    {
      type: 'list',
      name: 'tracker',
      message: 'What would you like to do?',
      choices: trackerChoices,
    }
  ]).then((res) => {
    // TODO- Create a variable to store the user's choice
    let trackerChoice;
    switch (res.trackerChoices) {
      case value:

        break;


      // TODO- Create a switch statement to call the appropriate function depending on what the user chose
      case value:

        break;

      // TODO- Create a function to View all employees
      case value:

        break;

      // BONUS- Create a function to View all employees that belong to a department
      case value:

        break;
      // BONUS- Create a function to View all employees that report to a specific manager
      case value:

        break;
      // BONUS- Create a function to Delete an employee
      case value:

        break;
      // TODO- Create a function to Update an employee's role
      case value:

        break;
      // BONUS- Create a function to Update an employee's manager
      case value:

        break;
      // TODO- Create a function to View all roles
      case value:

        break;
      // TODO- Create a function to Add a role
      case value:

        break;
      // BONUS- Create a function to Delete a role
      case value:

        break;
      // TODO- Create a function to View all deparments
      case value:

        break;
      // TODO- Create a function to Add a department
      case value:

        break;
      // BONUS- Create a function to Delete a department
      case value:

        break;
      // BONUS- Create a function to View all departments and show their total utilized department budget
      case value:

        break;
      // TODO- Create a function to Add an employee

    }
  });
}
// Exit the application
function quit() {
  console.log("Goodbye!");
  process.exit();
}