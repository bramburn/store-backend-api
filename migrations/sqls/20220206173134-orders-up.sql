/* Replace with your SQL commands */

create type status_enum as enum ('ACTIVE','COMPLETE');

create table if not exists orders
(

    id     serial primary key,
    userId int references users (id),
    status status_enum

);
