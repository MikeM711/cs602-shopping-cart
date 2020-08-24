Project & Presentation Grade: 100/100

Final Project: MET CS 602 O2 Server-Side Web Development (2020 Summer 2)
By, Michael McCabe

This project is based off of Professor Kalathur's sample Merchant Website.
Application is built using NodeJS, MongoDB, Express and Handlebars.

How to run:
1) Install node packages: npm install
2) Initialize database with: node initDB.js

Rest endpoints for JSON and XML:
http://localhost:3000/api/products
http://localhost:3000/api/products/product_name
http://localhost:3000/api/price?low=low_range_num&high=high_range_num

Future features:
1) Use Passport.js and Bcrypt for authentication - not storing plain passwords in the database
2) User registration
3) More server-side validation
4) Provide images of all products via CDN
5) Use Stripe to implement a payment functionality
6) React frontend
7) Create a "list" of orders instead of having the user order one product at a time
8) Code refactoring - eliminate duplicate code
9) Redis data caching
