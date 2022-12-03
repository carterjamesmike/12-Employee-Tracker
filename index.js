const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

//Start up prompts
function init() {
    inquirer
        .prompt([
        {
            type: 'list',
            name: 'init',
            message: "Would would you like to do?",
            choices: ['View all departments', 'View all roles', 'View all personnel', 'Add a department', 'Add a role', 'Add a crew member', 'Update a crew member']
        },
        ])
    .then((answers) => {
        console.log(answers.init);
        if (answers.init === "View all departments") {
          console.log("View all departments")
        } else if (answers.init === "View all roles") {
            console.log("View all roles");
        } else if (answers.init === "View all personnel") {
            console.log("View all personnel");
        } else if (answers.init === "Add a department") {
            console.log("Add a department");
        } else if (answers.init === "Add a role") {
            console.log("Add a role");
        } else if (answers.init === "Add a crew member") {
            console.log("Add a crew member");
        } else {
            console.log("Update a crew member");
        };
      }); 
};

init();

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

