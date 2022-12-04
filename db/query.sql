SELECT roles.id, roles.title, department.department_name, roles.rank
FROM department
LEFT JOIN roles
ON department.id = roles.department_id
ORDER BY department.id;

SELECT crew.id, crew.first_name, crew.last_name, roles.title, department.department_name, roles.rank
FROM crew
LEFT JOIN roles ON roles.id = crew.role_id
LEFT JOIN department ON department.id = roles.department_id
SELECT crew.manager_id AS manager 
FROM crew

ORDER BY crew.last_name;


--Crew
--ID crew
--First Name crew
--Last name crew
--Title roles 
--Department department
--Rank roles
--Manager crew

