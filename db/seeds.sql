--Seed data for department table--
INSERT INTO department (department_name)
VALUES ("Command"),
       ("Engineering"),
       ("Security"),
       ("Science"),
       ("Medical");

--Seed data for roles table--
INSERT INTO roles (title, `rank`, department_id)
VALUES  ("Captain", 6, 1),
        ("First Officer", 5, 1),
        ("Chief Engineer", 4, 2),
        ("Transporter Chief", 0.7, 2),
        ("Chief Security Officer", 3, 3),
        ("Tactical Officer", 2, 3),
        ("Chief Science Officer", 4, 4),
        ("Xenobiologist", 0.5, 4),
        ("Chief Medical Officer", 5, 5),
        ("Ship's Counselor", 4, 5);

--Seed data for crew table--
INSERT INTO crew (first_name, last_name, role_id, manager_id)
VALUES  ("Jean-Luc", "Picard", 1, null),
        ("William", "Riker", 2, 1),
        ("Geordi", "La Forge", 3, null),
        ("Miles", "O'Brien", 4, 3),
        ("Tasha", "Yar", 5, null),
        ("Worf", "Son of Mogh", 6, 5),
        ("Data", "Soong", 7, null),
        ("Keiko", "O'Brien", 8, 7),
        ("Beverly", "Crusher", 9, null),
        ("Deanna", "Troi", 10, 9);        


