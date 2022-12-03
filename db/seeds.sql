INSERT INTO department (department_name)
VALUES ("Command"),
       ("Engineering"),
       ("Security"),
       ("Science"),
       ("Medical");

INSERT INTO roles (title, experience, department_id)
VALUES  ("Captain", 30, 1),
        ("First Officer", 20, 1),
        ("Chief Engineer", 10, 2),
        ("Transporter Chief", 1, 2),
        ("Chief Security Officer", 5, 3),
        ("Tactical Officer", 2, 3),
        ("Chief Science Officer", 8, 4),
        ("Xenobiologist", 6, 4),
        ("Chief Medical Officer", 10, 5),
        ("Ship's Counselor", 6, 5);

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

