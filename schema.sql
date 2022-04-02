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