DROP DATABASE IF EXISTS burgers_db;

CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers(
  id INT NOT NULL AUTO_INCREMENT,
  burger_name VARCHAR(100),
  devoured BOOLEAN,
  burger_desc VARCHAR(255) default "No description",
  PRIMARY KEY (id)
)