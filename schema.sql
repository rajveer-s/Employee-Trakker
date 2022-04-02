-- IF THE DATABASE ALREADY THERE DELETE IT AND MAKE A FRESH ONE 
DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

-- department table 
CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

-- Role table 

CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY,  
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

-- Employye table  

CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) 
  REFERENCES role(id) 
  ON DELETE SET NULL,
  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
  ON DELETE SET NULL
);