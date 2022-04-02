-- Adding data to department table

INSERT INTO department (name)
VALUES ("IT"),
       ("Finance"),
       ("Sales"),
       ("Marketing");

-- Adding data to Role table

       INSERT INTO role (title, salary, department_id)
VALUES ("IT Director", 300000, 1),
       ("Engineer", 150000, 1),
       ("Accounting", 140000, 2),
       ("The Sales Manager", 180000, 3),
       ("Sales Development Rep", 80000, 3),
       ("Digital Marketing", 75000, 4),
       ("Distribution", 60000, 4);

-- Adding data to Employee table
