CREATE DATABASE currency_exchange;
USE currency_exchange;

CREATE TABLE currencies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    currency_code VARCHAR(5) UNIQUE NOT NULL,
    rate_to_usd DECIMAL(10,4) NOT NULL
);

INSERT INTO currencies (currency_code, rate_to_usd) VALUES 
('EUR', 1.10),
('GBP', 1.25),
('INR', 0.012);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (username, password) VALUES ('admin', 'admin123');
