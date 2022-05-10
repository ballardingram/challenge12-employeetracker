-- SEEDS > DEPARTMENT
INSERT INTO department (name)
VALUES
('Human Resources'),
('Legal'),
('Operations');

-- SEEDS > ROLE
INSERT INTO roles (title, salary, department_id)
VALUES
('VP of Human Resources', '10000000', 1),
('AVP of Human Resources', '8000000', 1),
('Recruiter', '4500000', 1),
('Head of Legal', '25000000', 2),
('Legal Consultant', '10000000', 2),
('EVP of Distribution', '17500000', 3),
('Director of Customer Service', '12500000', 3);

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

