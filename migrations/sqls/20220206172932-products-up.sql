/* Replace with your SQL commands */


create table if not exists products
(
    id    serial primary key,
    name  varchar(128) not null,
    price float default 0.00
)
