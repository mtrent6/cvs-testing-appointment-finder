ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;

CREATE DATABASE cvsTesting CHARACTER SET utf8 COLLATE utf8_unicode_ci;

USE cvsTesting;

CREATE TABLE User (
    ID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    LastName varchar(32),
    FirstName varchar(32),
    Phone varchar(255) NOT NULL UNIQUE,
    Carrier varchar(32)
);

CREATE TABLE Clinic (
    UserId int,
    ClinicId int
);