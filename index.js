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

//Function and variable for rendering art on startup  
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
       //let test = results[1].department_name
        //console.log(test);
        init();
})
};

function viewRoles () {
    db.query('SELECT roles.id, roles.title, department.department_name, roles.rank FROM department LEFT JOIN roles ON department.id = roles.department_id ORDER BY department.id', function (err, results) {
        console.table(results);
        init();
})
};

//Still require correction
function viewCrew () {
    db.query('SELECT * FROM crew', function (err, results) {
        console.table(results);
        init();
})
};

function addDept () {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'addDept',
            message: "Please enter name of department you would like to add",
        },
        ])
    .then((answer) => {
        db.query('INSERT INTO department (department_name) VALUES (?)', answer.addDept, (err, results) => {
            db.query('SELECT * FROM department', function (err, results) {
                console.table(results);
                init();
            })
        })
      });
};

function addRole () {
    const deptArr = [];
    const deptIdArr = [];
    db.query('SELECT * FROM department', function (err, results) {
        for (let i = 0; i < results.length; i++) {
            deptArr.push(results[i].department_name);
            deptIdArr.push(results[i].id);
        };
    });
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'addTitle',
            message: "Please enter name of role you would like to add",
        },
        {
            type: 'input',
            name: 'addRank',
            message: "Please enter, in numbers, the rank associated with this role",
        },
        {
            type: 'list',
            name: 'addDeptId',
            message: "Please enter the associated department ID for this role",
            choices: deptArr,
        },
        ])
    .then((answers) => {
        let deptAnswer;
        for (let i = 0; i < deptArr.length; i++) {
            if (answers.addDeptId === deptArr[i]) {
                deptAnswer = deptIdArr[i];
                break;
            } 
        }
        console.log(`The dept answer is ${deptAnswer}`);
        db.query('INSERT INTO roles (title, `rank`, department_id) VALUES (?, ?, ?)', [answers.addTitle, answers.addRank, deptAnswer], (err, results) => {
            db.query('SELECT * FROM role', function (err, results) {
                console.table(results);
                init();
            })
        })
      });
};

//Drop down menu for selecting role and manager
function addCrew () {
    console.log("Add Crew function");
    const roleArr = [];
    const roleIdArr = [];
    db.query('SELECT * FROM roles', function (err, results) {
        for (let i = 0; i < results.length; i++) {
            roleArr.push(results[i].title);
            roleIdArr.push(results[i].id);
        };
    });
    const managerNameArr = [];
    db.query('SELECT * FROM crew', function (err, results) {
        for (let i = 0; i < results.length; i++) {
            managerNameArr.push(results[i].first_name + ' ' + results[i].last_name);
            console.log(managerNameArr[i]);
        };
    });


    inquirer
        .prompt([
        {
            type: 'input',
            name: 'addFirst',
            message: "Please enter the first name of the new crew member.",
        },
        {
            type: 'input',
            name: 'addLast',
            message: "Please enter the last name of the new crew member.",
        },
        {
            type: 'input',
            name: 'addRoleId',
            message: "Please enter the associated role ID for this new crew member.",
        },
        {
            type: 'input',
            name: 'addManagerId',
            message: "Please enter the associated manager ID for this new crew member.",
        },
        ])
    .then((answers) => {
        let firstName= JSON.stringify(answers.addFirst).replace(/['"]+/g, '');
        let lastName= JSON.stringify(answers.addLast).replace(/['"]+/g, '');
        db.query('INSERT INTO crew (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, answers.addRoleId, answers.addManagerId], (err, results) => {
            db.query('SELECT * FROM crew', function (err, results) {
                console.table(results);
                init();
            })
        })
      });
};

function updateCrew () {
console.log("Update a crew member");
};


renderArt();
init();


//View crew
//  Table showing employee id, firt name, last name job title, dept, salary, and manager the employee reports to


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

//Double Bonus
//Chalk it up!
//Exit function

