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