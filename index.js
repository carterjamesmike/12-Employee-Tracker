const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'qwe123',
      database: 'crew_db'
    },
    console.log(`Connected to the books_db database.`)
  );

let art = "                                              _______----_______\r\n                                   ___---~~~~~.. ... .... ... ..~~~~~---___\r\n                             _ ==============================================\r\n __________________________ - .. ..   _--~~~~~-------____-------~~~~~\r\n(______________________][__)____     -\r\n   \/       \/______---~~~.. .. ..~~-_~\r\n  <_______________________________-\r\n      ~~~~~~~-----__           __-\r\n                    ~~~~~~~~~~~\r\n\r\n                                _____.-----._____\r\n                   ___----~~~~~~. ... ..... ... .~~~~~~----___\r\n                =================================================\r\n                   ~~~-----......._____________.......-----~~~\r\n                    (____)          \\   |   \/          (____)\r\n                      ||           _\/   |   \\_           ||\r\n                       \\\\_______--~  \/\/~~~\\\\  ~--_______\/\/\r\n                        `~~~~---__   \\\\___\/\/   __---~~~~\'\r\n                                  ~~-_______-~~\r\n\r\n                U S S   E N T E R P R I S E   N C C - 1 7 0 1 - D"

function renderArt () {
    console.log(art)
}

//Init prompts
function init() {
    inquirer
        .prompt([
        {
            type: 'list',
            name: 'init',
            message: "Would would you like to do?",
            choices: ['View all departments', 'View all roles', 'View all crew members', 'Add a department', 'Add a role', 'Add a crew member', 'Update a crew member']
        },
        ])
    .then((answers) => {
        console.log(answers.init);
        if (answers.init === "View all departments") {
            viewDept();
        } else if (answers.init === "View all roles") {   
            viewRoles();
        } else if (answers.init === "View all crew members") {         
            viewCrew();
        } else if (answers.init === "Add a department") {
            addDept();
        } else if (answers.init === "Add a role") {
            addRole();
        } else if (answers.init === "Add a crew member") {
            addCrew();
        } else {
            updateCrew();
        };
      }); 
};

function viewDept () {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        init();
})
};

function viewRoles () {
    db.query('SELECT roles.id, roles.title, department.department_name, roles.rank FROM department LEFT JOIN roles ON department.id = roles.department_id ORDER BY department.id', function (err, results) {
        console.table(results);
        init();
})
};

function viewCrew () {
    db.query('SELECT * FROM crew', function (err, results) {
        console.table(results);
        init();
})
};

function addDept () {
console.log("Add a department");
};

function addRole () {
console.log("Add a role");
};

function addCrew () {
console.log("Add a crew member");
};

function updateCrew () {
console.log("Update a crew member");
};


renderArt();
init();


//View employees
//  Table showing employee id, firt name, last name job title, dept, salary, and manager the employee reports to

//Add department 
//  Prompted to enter the name of department and its added to database (show all departments after)

//Add role
//  Prompted to enter name, salary, and department of role and is added to db (show roles after)

//Add employee 
//  Prompted to enter firt name, last name, role, and manager and new employee is added to database (show employees afterwards)

//Add exit command to init() prompts

//Bonus
//Update employee managers
//view employees by manager
//view employees by department
//Delete departments, roles, employees
//View total utilized budged of a department (combined salaries of all employees in dept)

