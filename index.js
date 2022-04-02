// Import and require all the packages
const fs = require('fs');
const inquirer = require('inquirer');
const mysql = require('mysql2');
require("console.table");


// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // Add MySQL password here
    password: "password",
    database: "company_db",
  },
  console.log(
    `
  
          -----------------------------------------
         |                                        |
         |           WELCOME, You are now         | 
         |                                        |
         |    connected to the company database   |  
         |                                        |      
          -----------------------------------------


`)
);
// brings up the questions right whem the database is fired 
promtMenu()

// this function will display a list of choices for the user to select from
function promtMenu() {
  inquirer.prompt([{
    type: 'list',
    name: 'menu',
    message: 'What would you like to do?',
    choices: [
      'View All Employees',
      'Add Employee',
      'Update Employee Role',
      'View All Roles',
      'Add Role',
      'View All Departments',
      'Add Department',
      'I am all done'
    ]
  }
  ]).then(answers => {
    switch (answers.menu) {
      case "View All Employees":
        viewAllEmp()  //view all employees function 
        break;
      case "Add Employee":
        addEmployee() // Add employee function
        break;

      case "Update Employee Role":
        // update employee role function 
        break;

      case "View All Roles":
        viewAllRoles() // view all roles function
        break;

      case "Add Role":
        // add role function
        break;

      case "View All Departments":
        viewAllDept(); // view all departments function
        break;

      case "Add Department":
        addDepartment(); // add department function
        break;

      default:
        process.exit(); // exit function 
    }
  });
}

// function to view all Employees with thier manager name and salaries from a diffrent table 
function viewAllEmp() {

  let sql = `SELECT employee.id, employee.first_name AS FirstName, employee.last_name AS LastName,  role.title AS Title,  role.salary AS Salary, department.name AS Department, CONCAT(manager.first_name," ",manager.last_name) AS Manager FROM employee LEFT JOIN employee manager ON manager.id = employee.manager_id INNER JOIN role ON (role.id = employee.role_id) INNER JOIN department ON (department.id = role.department_id)`


  db.query(sql, (err, res) => {
    if (err) {
      console.error(err)
    }
    console.table(res);
    promtMenu();
  });
}