-- Create table "user"
CREATE TABLE user
(
    id       INT PRIMARY KEY AUTO_INCREMENT,
    email    VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    key      TEXT         NOT NULL
);
