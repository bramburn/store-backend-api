# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index - `product/index` [HttpGet]
- Show - `product/:id` [HttpGet]
- Create - `product/` [HttpPost] [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index - `user/index` [HttpGet] [token required]
- Show - `user/:id` [HttpGet] [token required]
- Create - `user/` [HttpPost] [token required]

#### Orders
- Current Order by user (args: user id) - `order/:uid` [HttpGet] [token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product - Table: products
-  id - number [Primary Key] [Serial]
- name - string
- price - double
- [OPTIONAL] category

#### User - Table: users
- id - number [Primary Key] [Serial]
- firstName - string
- lastName - string
- passwordHash - string (not displayed)

#### Orders - Table: orders
- id - number [Primary Key] [Serial]
- userId - number [ForeignKey of users.id]
- status - enum of 'ACTIVE' OR 'COMPLETE' - status of order (active or complete)

#### Product order join table - Table: order_product
- quantity - number of each product in the order
- productId - number [ForeignKey of products.id]
- orderId - number [ForeignKey of orders.id]
