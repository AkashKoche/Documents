# Login-and-Registration-Project Based on Nodejs and PostgreSQL

Step 1: Install nodejs npm
Step 2: Install PostgreSQL
        RUN $ sudo -iu postgres
            $ initdb --locale $LANG -E UTF8 -D '/var/lib/postgres/data/'
            $ exit
            $ sudo systemctl start postgresql
            $ sudo systemctl status postgresql
Step 3: Create a Role and Database
            $ sudo -u postgres psql

-- Create the role
CREATE ROLE your_username WITH LOGIN PASSWORD 'your_password';

-- Create the database
CREATE DATABASE your_database;

-- Grant all privileges on the database to the role
GRANT ALL PRIVILEGES ON DATABASE your_database TO your_username;

Step 4: Create Database
$ sudo -u postgres psql
$ \c your_database
$ CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    date_of_birth DATE
);
$ \d users

Step 5: Run the Application
$ node index.js
