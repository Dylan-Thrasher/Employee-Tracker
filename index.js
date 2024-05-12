const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
const userChoices = ['View All Employees', 'View All Roles', 'View All Departments', 'View Budget',
  'Add Employee', 'Update Role for Employee', 'Add Role', 'Add Department', 'Quit']

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
      case 'Update Role for Employee':
        db.findAllEmployees().then(({ rows }) => {
          const employees = rows.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
          }))
          db.findAllRoles().then(({ rows }) => {
            const roles = rows.map(({ id, title }) => ({
              name: `${title}`,
              value: id
            }))
            prompt([
              {
                type: 'list',
                name: 'update',
                message: 'Which employee do you want to update the role for?',
                choices: employees,
              },
              {
                type: 'list',
                name: 'role',
                message: 'What role would you like to update them to?',
                choices: roles,
              },
            ])
              .then((res) => {
                let { update, role } = res;
                db.updateEmployeeRole(update, role)
                  .then(() => {
                    loadMainPrompts();
                  })
              })
          })
        })
        break;
      // BONUS- Create a function to Update an employee's manager
      // case value:

      //   break;
      // TODO- Create a function to View all roles
      case 'View All Roles':
        db.findAllRoles().then((role) => {
          console.table(role.rows);
        }).then(() => {
          loadMainPrompts();
        })
        break;
      // TODO- Create a function to Add a role
      case 'Add Role':
        db.findAllDepartments().then(({ rows }) => {
          const departments = rows.map(({ department_id, department_name }) => ({
            name: `${department_name}`,
            value: department_id
          }))
          prompt([
            {
              type: 'input',
              name: 'role',
              message: 'Which role would you like to add?',
            },
            {
              type: 'input',
              name: 'salary',
              message: 'What would be the salary for this role?',
            },
            {
              type: 'list',
              name: 'department',
              message: 'What department will this role fall under?',
              choices: departments,
            },
          ])
            .then((res) => {
              let { role, salary, department } = res;
              db.addRole(role, salary, department)
                .then(() => {
                  console.log('Role has been added');
                }).then(() => {
                  loadMainPrompts();
                })
            })
        })

        break;
      // BONUS- Create a function to Delete a role
      // case value:

      //   break;
      // TODO- Create a function to View all deparments
      case 'View All Departments':
        db.findAllDepartments().then((department) => {
          console.table(department.rows);
        }).then(() => {
          loadMainPrompts();
        })
        break;
      // TODO- Create a function to Add a department
      case 'Add Department':
        db.findAllDepartments().then(({ rows }) => {
          const departments = rows.map(({ department_id, department_name }) => ({
            name: `${department_name}`,
            value: department_id
          }))
          prompt([
            {
              type: 'input',
              name: 'department',
              message: 'Which department would you like to add?',
            },
            {
              type: 'list',
              name: 'department_id',
              message: 'What department will this role fall under?',
              choices: departments,
            },
          ])
            .then((res) => {
              let { department, department_id } = res;
              db.addDepartment(department, department_id)
                .then(() => {
                  console.log('Department has been added');
                }).then(() => {
                  loadMainPrompts();
                })
            })
        })
        break;
      // BONUS- Create a function to Delete a department
      // case value:

      //   break;
      // BONUS- Create a function to View all departments and show their total utilized department budget
      case 'View Budget':
        db.viewBudget().then(({ rows }) => {
          console.table(rows)
        }).then(() => {
          loadMainPrompts();
        })
        break;
      // TODO- Create a function to Add an employee
      case 'Add Employee':
        db.findAllRoles().then(({ rows }) => {
          const roles = rows.map(({ id, title }) => ({
            name: `${title}`,
            value: id
          }))
          db.findAllEmployees().then(({ rows }) => {
            const managers = rows.map(({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id
            }))
            prompt([
              {
                type: 'input',
                name: 'fname',
                message: 'What is the first name of the employee you would like to add?',
              },
              {
                type: 'input',
                name: 'lname',
                message: 'What is the last name of the employee you would like to add?',
              },
              {
                type: 'list',
                name: 'role',
                message: 'What is the role of the employee you would like to add?',
                choices: roles,
              },
              {
                type: 'list',
                name: 'manager',
                message: 'Who is the manager of the employee you would like to add?',
                choices: managers,
              },
            ])
              .then((res) => {
                let { fname, lname, role, manager } = res;
                db.addEmployee(fname, lname, role, manager)
                  .then(() => {
                    console.log('Employee has been added');
                  }).then(() => {
                    loadMainPrompts();
                  })
              })
          })
        })
        break;

      case 'Quit':
        quit();
        break;
    }
  });
}
// Exit the application
function quit() {
  console.log("Goodbye!");
  process.exit();
}