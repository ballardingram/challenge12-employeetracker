-- SEEDS > DEPARTMENT
INSERT INTO department (name)
VALUES
('Human Resources'),
('Legal'),
('Operations');

-- SEEDS > ROLE
INSERT INTO roles (title, salary, department_id)
VALUES
('VP of Human Resources', '100000.00', 1),
('AVP of Human Resources', '80000.00', 1),
('Recruiter', '45000.00', 1),
('Head of Legal', '250000.00', 2),
('Legal Consultant', '100000.00', 2),
('EVP of Distribution', '175000.00', 3),
('Director of Customer Service', '125000.00', 3);

-- SEEDS > EMPLOYEE
INSERT INTO employee (first_name, last_name, role_id, manager_id )
VALUES
('Candace', 'Sure', 1, NULL),
('Anna', 'Lorn', 2, 1),
('Brandon', 'Talos', 3, 1),
('Alicia', 'Florrick', 4, NULL),
('Cary', 'Grant', 5, 1),
('Caleb', 'Antonio', 6, NULL),
('Bo', 'Walling', 7, 6);

