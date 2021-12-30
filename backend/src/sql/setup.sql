CREATE DATABASE cvsTesting CHARACTER SET utf8 COLLATE utf8_unicode_ci;

USE cvsTesting;

CREATE TABLE User (
    ID int,
    LastName varchar(32),
    FirstName varchar(32),
    Email varchar(255),
    Carrier varchar(32)
);