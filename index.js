const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

















//Required Prompts
//On start up
//  View all departmeents  
//  View all roles
//  View all employees
//  Add a department
//  add a role
//  add an employee
//  update an employee

//View all departments
//  Tables showing department names and ids

//View all roles
//  Table showing job title, role id, depatarment, salary

//View employees
//  Table showing employee id, firt name, last name job title, dept, salary, and manager the employee reports to

//Add department 
//  Prompted to enter the name of department and its added to database (show all departments after)

//Add role
//  Prompted to enter name, salary, and department of role and is added to db (show roles after)

//Add employee 
//  Prompted to enter firt name, last name, role, and manager and new employee is added to database (show employees afterwards)

//Bonus
//Update employee managers
//view employees by manager
//view employees by department
//Delete departments, roles, employees
//View total utilized budged of a department (combined salaries of all employees in dept)

