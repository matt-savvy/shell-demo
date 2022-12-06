const faker = require("@faker-js/faker");
const factory = require("./factory");
const { User } = require("../models");

const fields = ["username", "email", "password", "roles"];

const fallbacks = {
  username: faker.internet.userName,
  email: faker.internet.email,
  password: faker.internet.password,
};

function createUser(values) {
  return new User(factory(fields, values, fallbacks));
}

module.exports = {
  build: function (values) {
    return createUser(values);
  },
  create: async function (values) {
    const user = createUser(values);
    return await user.save();
  },
  createMany: async function (quantity, values) {
    let array = [];
    for (let i = 0; i < quantity; i += 1) {
      let user = await createUser(values).save();
      array.push(user);
    }
    return array;
  },
  data: function (values) {
    return factory(fields, values, fallbacks);
  },
};
