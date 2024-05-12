const pool = require("./connection");

class DB {
  constructor() {}

  async query(sql, args = []) {
    const client = await pool.connect();
    try {
      const result = await client.query(sql, args);
      return result;
    } finally {
      client.release();
    }
  }

  // Created a query to Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
  findAllEmployees() {
    return this.query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salaries, department.name, manager.id AS departments"
    );
  }

  // Created a query to Find all employees except the given employee id
  findAllEmployeesWithoutId() {
    return this.query(
        "SELECT FROM employees WHERE id IS NULL OR id =''"
    )
  }

  // Created a query to Create a new employee
    addEmployee(first_name, last_name, role_id, manager_id) {
        return this.query(
            "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4);",[first_name, last_name, role_id, manager_id]
        )
    }
 
  // BONUS- Create a query to Remove an employee with the given id

  // Created a query to Update the given employee's role
    updateEmployeeRole(update, role) {
        return this.query(
            "UPDATE employees SET role_id = $2 WHERE id = $1;" [update, role]
        )
    }

  // BONUS- Create a query to Update the given employee's manager

  // Created a query to Find all roles, join with departments to display the department name
  findAllRoles(department_id) {
    return "SELECT title, department_id FROM role JOIN department ON role.department_id = department.department_id WHERE department.department_id = $1"
  }

  // Created a query to Create a new role
  addRole(role, salary, department_id) {
    return this.query(
      "INSERT INTO employees (title, salary, department_id) VALUES ($1, $2, $3);",[title, salary, department_id]
    )
  }

  // BONUS- Create a query to Remove a role from the db

  // Created a query to Find all departments
  findAllDepartments() {
    return this.query(
        "SELECT * FROM department;"
    )
}

  // BONUS- Create a query to Find all departments, join with employees and roles and sum up utilized department budget

  // Created a query to Create a new department
  addDepartment(department_name) {
    return this.query(
      "INSERT INTO department (department_name) VALUES ($1);",[department_name]
    )
  }

  // BONUS- Create a query to Remove a department

  // BONUS- Create a query to Find all employees in a given department, join with roles to display role titles

  // BONUS- Create a query to Find all employees by manager, join with departments and roles to display titles and department names
}

module.exports = new DB();