***
This is online shopping project that is written by react and use serverless firebase as database.

***
You have 2 ways to login, you can login with google auth or use email and password for register and login(for simplicity email will not going to confirmed – so you can use fake email address).

***
Payment is with stripe and after successful payment you’ll have your purchased products in your profile.(you can use 4242 4242 4242 4242 as card number for payment).

***
For add new products or edit existed products or delete a product from database please login as admin: 
username : admin@gmail.com
Password: 123456789


***
Firebase rules are simple:
1-each individual user could see or edit only its own profile information or products in cart.
2-only admin could edit products information or add new photo for a product.
3-user purchased products will decrease from database by cloud function in the backend that has admin SDK access to the database.
