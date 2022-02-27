/* Replace with your SQL commands */
create table IF NOT EXISTS users
(
    id           serial primary key,
    firstName    varchar(128) not null,
    lastName     varchar(128) not null,
    email        varchar(256) not null unique,
    passwordHash varchar(256)

);
