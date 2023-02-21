const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_SEED_USERS = 10;

// Create users
const users = [];

users.push(
  new User ({
    username: 'demo-user',
    email: 'demo-user@appacademy.io',
    hashedPassword: bcrypt.hashSync('123456', 10)
  })
)

users.push(
    new User ({
      username: 'dantheman',
      email: 'dan@gmail.com',
      hashedPassword: bcrypt.hashSync('123456', 10)
    })
)

users.push(
    new User ({
      username: 'wilsonwonder',
      email: 'willy@gmail.com',
      hashedPassword: bcrypt.hashSync('123456', 10)
    })
)

users.push(
    new User ({
      username: 'JQmodel',
      email: 'jiong@gmail.com',
      hashedPassword: bcrypt.hashSync('123456', 10)
    })
)

users.push(
    new User ({
      username: 'chakybara',
      email: 'chak@gmail.com',
      hashedPassword: bcrypt.hashSync('123456', 10)
    })
)

users.push(
    new User ({
      username: 'timmyturner',
      email: 'tim@gmail.com',
      hashedPassword: bcrypt.hashSync('123456', 10)
    })
)

for (let i = 1; i < NUM_SEED_USERS; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    users.push(
      new User ({
        username: faker.internet.userName(firstName, lastName),
        email: faker.internet.email(firstName, lastName),
        hashedPassword: bcrypt.hashSync(faker.internet.password(), 10)
      })
    )
  }

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

// Reset and seed db
const insertSeeds = () => {
  console.log("Resetting db and seeding users...");

  User.collection.drop()
                 .then(() => Page.collection.drop())
                 .then(() => User.insertMany(users))
                 .then(() => Page.insertMany(pages))
                 .then(() => {
                   console.log("Done!");
                   mongoose.disconnect();
                 })
                 .catch(err => {
                   console.error(err.stack);
                   process.exit(1);
                 });
}