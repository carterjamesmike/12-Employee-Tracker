//Required modules for prompts, SQL interface, and table rendering
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

//Arrays that hold db data used for rendering and comparisons
const crewNameArr = [];
const crewIdArr = [];
const roleArr = [];
const roleIdArr = [];
const deptArr = [];
const deptIdArr = [];

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

//Init prompts, function calls, and queries for filling db arrays
function init() {

    db.query('SELECT * FROM crew',  function loadCrewArr (err, results) {
        for (let i = 0; i < results.length; i++) {
            crewNameArr.push(results[i].first_name + ' ' + results[i].last_name);
            crewIdArr.push(results[i].id)
        };
    });

    db.query('SELECT * FROM roles', function loadRoleArr (err, results) {
        for (let i = 0; i < results.length; i++) {
            roleArr.push(results[i].title);
            roleIdArr.push(results[i].id);
        };
    });

    db.query('SELECT * FROM department', function (err, results) {
        for (let i = 0; i < results.length; i++) {
            deptArr.push(results[i].department_name);
            deptIdArr.push(results[i].id);
        };
    });

    inquirer
        .prompt([
        {
            type: 'list',
            name: 'init',
            message: "Would would you like to do?",
            choices: ['View all departments', 'View all roles', 'View all crew members', 'Add a department', 'Add a role', 'Add a crew member', 'Update a crew member', 'Exit']
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
        } else if (answers.init === "Update a crew member") {
            updateCrew();
        } else {
            process.exit(0);
        };
      }); 
};

//Renders department data
function viewDept () {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        init();
})
};

//Renders roles data
function viewRoles () {
    db.query('SELECT roles.id, roles.title, department.department_name, roles.rank FROM department LEFT JOIN roles ON department.id = roles.department_id ORDER BY department.id', function (err, results) {
        console.table(results);
        init();
})
};

//Renders crew data
function viewCrew () {
    db.query("SELECT crew.id, crew.first_name, crew.last_name, roles.title, department.department_name, roles.rank, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name FROM crew JOIN roles ON crew.role_id = roles.id JOIN department ON department.id = roles.department_id LEFT JOIN crew AS manager ON crew.manager_id = man", function (err, results) {
        console.table(results);
        init();
})
};

//Adds a new department
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
            viewDept();
        })
      });
};

//Adds a new role
function addRole () {
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
        };
        db.query('INSERT INTO roles (title, `rank`, department_id) VALUES (?, ?, ?)', [answers.addTitle, answers.addRank, deptAnswer], (err, results) => {
            viewRoles();
        })
      });
};

//Adds a new crew member
function addCrew () {
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
            type: 'list',
            name: 'addCrewRole',
            message: "Please select the new crew member's role.",
            choices: roleArr,
        },
        {
            type: 'list',
            name: 'addCrewManager',
            message: "Please select the new crew member's manager.",
            choices: crewNameArr,
        },
        ])
    .then((answers) => {
        let roleAnswer;
        for (let i = 0; i < roleArr.length; i++) {
            if (answers.addCrewRole === roleArr[i]) {
                roleAnswer = roleIdArr[i];
                break;
            } 
        };
        let managerAnswer;
        for (let i = 0; i < crewNameArr.length; i++) {
            if (answers.addCrewManager === crewNameArr[i]) {
                managerAnswer = crewIdArr[i];
                break;
            } 
        };
        let firstName= JSON.stringify(answers.addFirst).replace(/['"]+/g, '');
        let lastName= JSON.stringify(answers.addLast).replace(/['"]+/g, '');
        db.query('INSERT INTO crew (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleAnswer, managerAnswer], (err, results) => {
                viewCrew();
        })
      });
};

//Updates crew role
function updateCrew () {
    inquirer    
        .prompt([
        {
            type: 'list',
            name: 'updateCrewAnswer',
            message: "Please select the crew member you would like to update.",
            choices: crewNameArr,
        },
        {
            type: 'list',
            name: 'updateRoleAnswer',
            message: "Please select their new role.",
            choices: roleArr,
        },
        ])
    .then((answers) => {
        let newRoleAnswer;
        for (let i = 0; i < roleArr.length; i++) {
            if (answers.updateRoleAnswer === roleArr[i]) {
                newRoleAnswer = roleIdArr[i];
                break;
            } 
        };
        let updateCrewAnswer;
        for (let i = 0; i < crewNameArr.length; i++) {
            if (answers.updateCrewAnswer === crewNameArr[i]) {
                updateCrewAnswer = crewIdArr[i];
                break;
            } 
        };
        db.query(`UPDATE crew SET role_id = ${newRoleAnswer} WHERE id = ${updateCrewAnswer}`, (err, results) => {
            viewCrew();
        })
      });
      
};

//Calls for rendering ASCII art and init functions
renderArt();
init();


//Bonus
//Update employee managers
//view employees by manager
//view employees by department
//Delete departments, roles, employees
//View total utilized budged of a department (combined salaries of all employees in dept)

//Double Bonus
//Chalk it up!
//Add Borg battle where crew gets assimilated and database corrupted.

