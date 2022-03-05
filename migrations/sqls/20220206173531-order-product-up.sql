/* Replace with your SQL commands */

create table if not exists order_product
(
    qty       int,
    orderId   int references orders (id),
    productId int references products (id)
);
