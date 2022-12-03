SELECT roles.id, roles.title, department.department_name, roles.rank
FROM department
LEFT JOIN roles
ON department.id = roles.department_id
ORDER BY department.id;


--Crew
--ID
--First Name
--Last name
--Title
--Department
--Rank
--Manager

