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
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Geraldine", "Chance", 1, NULL),
       ("Bob", "Smith", 1, 1),
       ("Trisha", "Way", 2, 1),
       ("Corynn", "Tracey", 2, 1),
       ("Ronald", "Perkins", 3, NULL),
       ("Tony", "Stark", 3, 5),
       ("Barnaby", "Arthurson", 4, NULL),
       ("Travers", "Wood", 5, 7),
       ("Jeffery", "Freeman", 6, 7),
       ("Steve", "Rodgers", 7, 7);