// Import and require all the packages
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
        viewAllEmp();  //view all employees function 
        break;
      case "Add Employee":
        addEmployee(); // Add employee function
        break;

      case "Update Employee Role":
        updatEmp();// update employee role function 
        break;

      case "View All Roles":
        viewAllRoles(); // view all roles function
        break;

      case "Add Role":
        addRole();// add role function
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

// this function allows you to see all the departments with its id and name 
function viewAllDept() {

  let sql = `SELECT * FROM department`

  db.query(sql, (err, res) => {
    if (err) {
      console.error(err)
    }
    console.table(res)
    promtMenu();
  });
}

// this function allows you to view all the employees roles 
function viewAllRoles() {
  let sql = `SELECT * FROM role`

  db.query(sql, (err, res) => {
    if (err) {
      console.error(err)
    }
    console.table(res)
    promtMenu();
  });
}

// this function allows you to add a new department to the table  
function addDepartment() {

  inquirer.prompt([{
    name: "name",
    message: "What department would you like to add ?"
  }]).then((res) => {
    let sql = `INSERT INTO department (name) VALUES ("${res.name}")`

    db.query(sql, res, (err) => {
      if (err) {
        console.error(err)
      }
      console.log(`added ${res.name} to the database`)
      viewAllDept();
    })
  })
}

// this function allows you to add employee to the database 
function addEmployee() {

  let roleArr = `SELECT role.id, role.title FROM role`;
  db.query(roleArr, (err, req) => {
    if (err) console.error(err);
    let roles = req.map(({ id, title }) => ({ name: title, value: id }));

    let managerArr = `SELECT * FROM employee`;
    db.query(managerArr, (err, req) => {
      if (err) console.error(err);
      let managers = req.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));


      inquirer
        .prompt([
          {
            name: "first_name",
            message: "What is Employees first name ?",
          },
          {
            name: "last_name",
            message: "What is Employees last name ?",
          },
          {
            type: "list",
            name: "role",
            message: "Select employees role ?",
            choices: roles,

          },
          {
            type: "list",
            name: "manager",
            message: "Select employees managers ?",
            choices: managers,
          },
        ])
        .then(function (res) {
          let userData = [res.first_name, res.last_name, res.role, res.manager];
          let sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)`

          db.query(sql, userData, (err, res) => {
            if (err)
              console.error(err);
            console.log("Employee successfully added!");
            viewAllEmp();
          });
        });
    });
  });
}

// this function creates a now role 
function addRole() {

  let dept = `SELECT department.id, department.name FROM department`;
  db.query(dept, (error, req) => {
    if (error) console.error(error);
    let deptArr = req.map(({ id, name }) => ({ name: name, value: id }));


    inquirer.prompt([{
      name: "title",
      message: "What role would you like to add ?"
    },
    {
      name: "salary",
      message: "How much is the salary for this role ?",
    },
    {
      type: "list",
      name: "dept",
      message: "What department will this role be in ?",
      choices: deptArr,

    }]).then((res) => {
      let userData = [res.title, res.salary, res.dept];
      let sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`

      db.query(sql, userData, (err) => {
        if (err) {
          console.error(err)
        }
        console.log(`added Role to the database`)
        viewAllRoles();
      })
    })
  })
}

// this function allows you to update existing employees role in the database 
function updatEmp() {

  let sql = `SELECT employee.id, employee.first_name, employee.last_name, role.id AS "role_id"
      FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    const empArr = result.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }))

    const roleArr = `SELECT role.id, role.title FROM role`;
    db.query(roleArr, (error, req) => {
      if (error) console.error(error);
      const roles = req.map(({ id, title }) => ({ name: title, value: id }));
      inquirer
        .prompt([
          {
            type: "list",
            name: "pickEmployee",
            message: "Which employees role would you like to update?",
            choices: empArr
          },
          {
            type: "list",
            name: "newRole",
            message: "What new Role would you like to assign for this employee?",
            choices: roles
          }
        ])
        .then(response => {
          const sql = `UPDATE employee SET employee.role_id = ? WHERE employee.id = ?`;
          const userData = [
            response.newRole,
            response.pickEmployee
          ];

          db.query(sql, userData, (err, res) => {
            if (err) {
              console.log(err)
              return;
            }
            console.info(`updated employee in the database`)
            viewAllEmp();
          });
        })
    })
  })
}