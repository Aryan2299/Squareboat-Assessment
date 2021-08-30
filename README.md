# Squareboat-Assessment

  - Frontend - ReactJS

  - Backend - NodeJS

  - Database - MongoDB



## Links

  - Frontend (deployed) - https://agile-brook-30814.herokuapp.com/login
  - Backend (deployed) - https://stormy-scrubland-59816.herokuapp.com



## Database Mappings

    - Order <-> User (one-to-many)
    - Cart <-> User (one-to-one)
    - Product <-> Order (many-to-many)



## Assignment Related Assumptions
    - User can only add one product to cart at a time
    - Tokens expires in an hour, but there are no sessions on fronted (user gets logged out on page refresh)
    - Used context API (React) as the application flow wasn't very complex
    - Pushed code for both backend and frontend collectively for easy navigation, but deployed both on Heroku separately



# API Docs

## POST /auth/login

**Payload**

| Field      | Type    |
| ---------- | -------:|
| email      | string  |
| password   | string  |


## POST /auth/signup

**Payload**

| Field      | Type    |
| ---------- | -------:|
| name       | string  |
| email      | string  |
| password   | string  |


## POST /auth/logout

**Payload**

| Field      | Type    |
| ---------- | -------:|
| userId     | string  |


## GET /user/orders

**Parameters**

| Field      | Type    |
| ---------- | -------:|
| token      | string  |


## GET /user/orders/:id

**Parameters**

| Field      | Type    |
| ---------- | -------:|
| token      | string  |
| id         | string  |


## GET /user/cart

**Parameters**

| Field      | Type    |
| ---------- | -------:|
| token      | string  |


## POST /user/cart/add

**Parameters**

| Field      | Type    |
| ---------- | -------:|
| token      | string  |

**Payload**

| Field      | Type    |
| ---------- | -------:|
| productId  | string  |


## GET /user/cart/empty

**Parameters**

| Field      | Type    |
| ---------- | -------:|
| token      | string  |



## GET /user/cart/checkout

**Parameters**

| Field      | Type    |
| ---------- | -------:|
| token      | string  |


## GET /products


## POST /products/get

**Payload**

| Field      | Type    |
| ---------- | -------:|
| productIds | array   |








