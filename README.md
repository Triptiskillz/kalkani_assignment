# Task-1: Anime Character Search App

This is a simple frontend application built using React and Bootstrap to search and list anime characters. The application utilizes the Jikan API to fetch anime character data based on user queries.

## Features

- Search for anime characters in real-time as the user types.
- Display a maximum of 15 search results per page.
- Show a warning message when no results are returned for a given search query.
- By default, display the top 15 characters if the user has not performed a search.
- Pagination buttons to navigate through search results ("Next" and "Back").
- Seamless integration with the Jikan API for character data.

## Technologies

- React
- Bootstrap

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Triptiskillz/kalkani_assignment.git
   ```

2. Navigate to the project directory:

   ```bash
   cd task-1
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the development server:

   ```bash
   npm start
   ```

2. Open your browser and go to [http://localhost:3000](http://localhost:3000) to view the application.

## API Documentation

The application uses the Jikan API to search for anime characters. Here are the relevant details:

- **Documentation:** [Jikan API Documentation](https://docs.api.jikan.moe/#operation/getCharactersSearch)
- **Search Endpoint:**
  - **Method:** GET
  - **URL:** `https://api.jikan.moe/v4/characters?page=<page_number>&limit=<page_limit>&q=<search_string>&order_by=favorites&sort=desc`

### Examples

- To get the top 15 characters, the API request would look like this:

  ```bash
  GET https://api.jikan.moe/v4/characters?page=1&limit=15&q=&order_by=favorites&sort=desc
  ```

  - To search for "saki," the API request looks like this:

  ```bash
  GET https://api.jikan.moe/v4/characters?page=1&limit=15&q=saki&order_by=favorites&sort=desc
  ```



# Task-2: SPA Application with Node.js Express (Backend) and ReactJS with Bootstrap (Frontend)

This is a Single Page Application (SPA) built using Node.js Express for the backend and ReactJS with Bootstrap for the frontend. The application is designed to manage user information and provides REST API endpoints for searching and updating user details.

## Technologies

- React
- Bootstrap
- PostgreSQL
- NodeJS
- Express

## Database Design

The database schema is designed to store user information, including multiple addresses. Here are the details of the database schema:

### Create Database
``` bash
CREATE DATABASE TEST;
```

### Users Table
- `user_id` (Primary Key)
- `first_name` (Mandatory)
- `last_name` (Mandatory)
- `email` (Unique, Mandatory, Valid Email)
- `mobile_number` (Unique, Mandatory, Valid 10-digit number)
- `birthdate` (Optional)
  
```bash
CREATE TABLE users (user_id SERIAL PRIMARY KEY,first_name VARCHAR(50) NOT NULL,last_name VARCHAR(50) NOT NULL,email VARCHAR(255) UNIQUE NOT NULL ,mobile_number VARCHAR(15) UNIQUE NOT NULL CHECK (mobile_number ~* '^[0-9]{10}$'),birthdate DATE,created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP);
```
### Addresses Table
- `address_id` (Primary Key)
- `user_id` (Foreign Key referencing `user_id` in `users` table, On Delete Cascade)
- `address_line_1` (Mandatory)
- `address_line_2` (Optional)
- `pincode` (Mandatory, 4-6 digit)
- `city` (Mandatory)
- `state` (Mandatory)
- `type` (Home or Office)
  
  ```bash
   CREATE TABLE addresses (address_id SERIAL PRIMARY KEY,user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,address_line_1 VARCHAR(255) NOT NULL,address_line_2 VARCHAR(255),pincode VARCHAR(6) NOT NULL CHECK (LENGTH(pincode) BETWEEN 4 AND 6),city VARCHAR(100) NOT NULL,state VARCHAR(100) NOT NULL,address_type VARCHAR(10) NOT NULL CHECK (address_type IN ('Home', 'Office')),created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP);
  ```
## Insert Data

### Users Table

```bash
INSERT INTO users (first_name, last_name, email, mobile_number, birthdate)VALUES
('John', 'Doe', 'john.doe@email.com', '1234567890', '1990-01-01'),
('Jane', 'Smith', 'jane.smith@email.com', '9876543210', '1985-05-15'),
('Alice', 'Johnson', 'alice.johnson@email.com', '5556667777', '1995-12-10'),
('Robert', 'Williams', 'robert.w@email.com', '1112233444', '1982-08-20'),
('Emily', 'Davis', 'emily.d@email.com', '9998887777', '1998-04-05'),
('Michael', 'Brown', 'michael.b@email.com', '7776665555', '1989-11-30'),
  ('Sophia', 'Miller', 'sophia.m@email.com', '5554443333', '1993-06-15'),
  ('Matthew', 'Taylor', 'matthew.t@email.com', '1110009999', '1980-09-25'),
  ('Olivia', 'Anderson', 'olivia.a@email.com', '8887776666', '1996-02-12'),
    ('Ethan', 'Johnson', 'ethan.j@email.com', '7778889999', '1991-03-18'),
  ('Ava', 'Wilson', 'ava.w@email.com', '5556664444', '1987-07-22'),
  ('Mason', 'Moore', 'mason.m@email.com', '9991112222', '1994-12-08'),
    ('Liam', 'Davis', 'liam.d@email.com', '1112223333', '1990-09-14'),
  ('Emma', 'Smith', 'emma.s@email.com', '8889990000', '1985-05-27'),
  ('Noah', 'Anderson', 'noah.a@email.com', '4445556666', '1993-11-03')
  ('Liam', 'Martin', 'liam.m@email.com', '1112223333', '1990-08-25'),
  ('Emma', 'Thompson', 'emma.t@email.com', '4445556666', '1984-04-12'),
  ('Noah', 'Perez', 'noah.p@email.com', '7778889999', '1993-12-03'),
   ('Aiden', 'Garcia', 'aiden.g@email.com', '9998887777', '1995-02-18'),
  ('Ella', 'Rodriguez', 'ella.r@email.com', '5554443333', '1988-07-10'),
  ('Carter', 'Lee', 'carter.l@email.com', '2223334444', '1996-11-28'),
    ('Mia', 'Hernandez', 'mia.h@email.com', '1112223333', '1994-09-15'),
  ('Liam', 'Turner', 'liam.t@email.com', '4445556666', '1986-03-22'),
  ('Evelyn', 'Scott', 'evelyn.s@email.com', '7778889999', '1991-12-08');
```


### Addresses Table

```bash
INSERT INTO addresses (user_id, address_line_1, address_line_2, pincode, city, state, address_type)VALUES
(1, '123 Main St', 'Apt 456', '12345', 'Cityville', 'Stateville', 'Home'),
(2, '789 Oak St', NULL, '54321', 'Townsville', 'Stateland', 'Office'),
(3, '456 Pine St', 'Suite 789', '98765', 'Villagetown', 'Cityland', 'Home'),
(4, '789 Maple St', 'Apt 101', '54321', 'Townsville', 'Stateland', 'Home'),
(5, '456 Birch St', 'Suite 567', '98765', 'Villagetown', 'Cityland', 'Office'),
(6, '321 Oak St', NULL, '34567', 'Hamletville', 'Countyland', 'Home'),
(7, '987 Cedar St', NULL, '54321', 'Cityville', 'Stateland', 'Office'),
  (8, '654 Elm St', 'Suite 345', '98765', 'Villagetown', 'Cityland', 'Home'),
  (9, '123 Pine St', 'Apt 789', '12345', 'Townsville', 'Stateland', 'Home'),
    (10, '789 Oak St', 'Apt 567', '54321', 'Townsville', 'Stateland', 'Home'),
  (11, '456 Pine St', 'Suite 123', '98765', 'Villagetown', 'Cityland', 'Office'),
  (12, '321 Elm St', NULL, '34567', 'Hamletville', 'Countyland', 'Office'),
   (13, '987 Maple St', 'Apt 201', '54321', 'Cityville', 'Stateland', 'Office'),
  (14, '654 Cedar St', 'Suite 345', '98765', 'Villagetown', 'Cityland', 'Home'),
  (15, '123 Oak St', NULL, '12345', 'Townsville', 'Stateland', 'Home'),
   (16, '789 Cedar St', 'Apt 201', '54321', 'Cityville', 'Stateland', 'Home'),
  (17, '456 Oak St', NULL, '98765', 'Villagetown', 'Cityland', 'Office'),
  (18, '321 Maple St', 'Suite 567', '34567', 'Hamletville', 'Countyland', 'Home'),
   (19, '789 Elm St', 'Apt 301', '54321', 'Cityville', 'Stateland', 'Office'),
  (20, '456 Pine St', 'Suite 789', '98765', 'Villagetown', 'Cityland', 'Home'),
  (21, '321 Cedar St', NULL, '34567', 'Hamletville', 'Countyland', 'Home'),
   (22, '789 Birch St', 'Apt 401', '54321', 'Cityville', 'Stateland', 'Home'),
  (23, '456 Oak St', NULL, '98765', 'Villagetown', 'Cityland', 'Office'),
  (24, '321 Pine St', 'Suite 567', '34567', 'Hamletville', 'Countyland', 'Home'),
  (11, '123 Main St', 'Apt 456', '12345', 'Cityville', 'Stateville', 'Home'),
(12, '789 Oak St', NULL, '54321', 'Townsville', 'Stateland', 'Office'),
(22, '456 Pine St', 'Suite 789', '98765', 'Villagetown', 'Cityland', 'Home'),
(24, '789 Maple St', 'Apt 101', '54321', 'Townsville', 'Stateland', 'Home'),
(15, '456 Birch St', 'Suite 567', '98765', 'Villagetown', 'Cityland', 'Office'),
(5, '321 Oak St', NULL, '34567', 'Hamletville', 'Countyland', 'Home'),
(6, '987 Cedar St', NULL, '54321', 'Cityville', 'Stateland', 'Office'),
  (9, '654 Elm St', 'Suite 345', '98765', 'Villagetown', 'Cityland', 'Home'),
  (3, '123 Pine St', 'Apt 789', '12345', 'Townsville', 'Stateland', 'Home'),
    (1, '789 Oak St', 'Apt 567', '54321', 'Townsville', 'Stateland', 'Home'),
  (2, '456 Pine St', 'Suite 123', '98765', 'Villagetown', 'Cityland', 'Office'),
  (3, '321 Elm St', NULL, '34567', 'Hamletville', 'Countyland', 'Office'),
   (5, '987 Maple St', 'Apt 201', '54321', 'Cityville', 'Stateland', 'Office'),
  (6, '654 Cedar St', 'Suite 345', '98765', 'Villagetown', 'Cityland', 'Home'),
  (16, '123 Oak St', NULL, '12345', 'Townsville', 'Stateland', 'Home'),
   (15, '789 Cedar St', 'Apt 201', '54321', 'Cityville', 'Stateland', 'Home'),
  (20, '456 Oak St', NULL, '98765', 'Villagetown', 'Cityland', 'Office'),
  (21, '321 Maple St', 'Suite 567', '34567', 'Hamletville', 'Countyland', 'Home'),
   (22, '789 Elm St', 'Apt 301', '54321', 'Cityville', 'Stateland', 'Office'),
  (12, '456 Pine St', 'Suite 789', '98765', 'Villagetown', 'Cityland', 'Home'),
  (11, '321 Cedar St', NULL, '34567', 'Hamletville', 'Countyland', 'Home'),
   (2, '789 Birch St', 'Apt 401', '54321', 'Cityville', 'Stateland', 'Home'),
  (17, '456 Oak St', NULL, '98765', 'Villagetown', 'Cityland', 'Office'),
  (14, '321 Pine St', 'Suite 567', '34567', 'Hamletville', 'Countyland', 'Home');

```
## REST API Endpoints

### 1. Search Users

**Endpoint:** `/user`

**Method:** GET

**Request query:**
```bash
Search users by name: /users/search?searchString=john
Search users by age: /users/search?minAge=25
Search users by age: /users/search?maxAge=30
Search users by city: /users/search?city=Mumbai
Combine multiple filters: /users/search?searchString=john&minAge=25&city=Mumbai
```

**Response:**
```json
[
  {
    "user_id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "mobile_number": "1234567890",
    "birthdate": "1990-01-01",
    "addresses": [
      {
        "address_id": 1,
        "address_line_1": "123 Main St",
        "address_line_2": "Apt 4",
        "pincode": "12345",
        "city": "Mumbai",
        "state": "MH",
        "type": "Home"
      },
      // Additional addresses...
    ]
  },
]
```

### 2. Get User Information

**Endpoint:** `/users/:userId`

**Method:** GET

**Request:**
```bash
http://localhost:4000/users/4 
```

**Response:**
```json
[
    {
        "user_id": 58,
        "first_name": "Emily",
        "last_name": "Davis",
        "email": "emily.d@email.com",
        "mobile_number": "9998887777",
        "birthdate": "1998-04-04T18:00:00.000Z",
        "created_at": "2024-01-14T18:13:37.956Z",
        "addresses": [
            {
                "address_id": 65,
                "address_line_1": "456 Birch St",
                "address_line_2": "Suite 567",
                "pincode": "98765",
                "city": "Villagetown",
                "state": "Cityland",
                "address_type": "Office",
                "created_at": "2024-01-14T18:13:37.956Z"
            },
            {
                "address_id": 67,
                "address_line_1": "123 Main St",
                "address_line_2": "Apt 456",
                "pincode": "12345",
                "city": "Cityville",
                "state": "Stateville",
                "address_type": "Home",
                "created_at": "2024-01-14T18:14:31.482Z"
            }
        ]
    }
]
```

### 3. Update User Information

**Endpoint:** `/users/:userId`

**Method:** PUT

**Request Body:**
```json
{
  "first_name": "UpdatedFirstName",
  "last_name": "UpdatedLastName",
  "email": "updated.email@example.com",
  "mobile_number": "9876543210",
  "birthdate": "1995-01-01",
  "addresses": [
    {
      "address_id": 1,
      "address_line_1": "Updated Address 1",
      "address_line_2": "Updated Address 2",
      "pincode": "54321",
      "city": "UpdatedCity",
      "state": "UP",
      "type": "Office"
    },
  ]
}
```

**Response:**
```json
{
  "message": "User information updated successfully"
}
```
### 4. Delete Address Information

**Endpoint:** `/addresses/:addressId`

**Method:** DELETE

**Request:**
```json
http://localhost:4000/addresses/4
```

**Response:**
```json
{
  "message": "Address deleted successfully"
}
```
## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Triptiskillz/kalkani_assignment.git
   cd task-2
   ```

2. **Install Dependencies:**
   - Backend (Node.js Express):
     ```bash
     cd server
     npm install
     ```
   - Frontend (ReactJS):
     ```bash
     cd client
     npm install
     ```

3. **Start the Application:**
   - Backend:
     ```bash
     cd server
     npm start
     ```
     The backend server will run on `http://localhost:4000`.
   - Frontend:
     ```bash
     cd client
     npm start
     ```
     The React development server will run on `http://localhost:3000`.

4. **Access the Application:**
   Open your browser and go to `http://localhost:3000` to access the SPA application.

