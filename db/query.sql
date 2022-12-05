--Query template for rendering roles--
SELECT roles.id, roles.title, department.department_name, roles.rank
FROM department
LEFT JOIN roles
ON department.id = roles.department_id
ORDER BY department.id;

--Query template for rendering crew--
SELECT crew.id, crew.first_name, crew.last_name, roles.title, department.department_name, roles.rank, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name 
FROM crew 
JOIN roles 
ON crew.role_id = roles.id
JOIN department 
ON department.id = roles.department_id
LEFT JOIN crew AS manager 
ON crew.manager_id = manager.id;

