import supertest from "supertest";
const request = supertest("https://gorest.co.in/public-api/");
const faker = require('faker');
const TOKEN =
  "ba8164f924992382db00d039a06ac3f107f2203f879086c03d6ba456036b825d";

export const createRandomUser = async () => {
  const userData = {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    gender: "Male",
    status: "Active",
  };

  const res= await request
    .post("users")
    .set("Authorization", `Bearer ${TOKEN}`)
    .send(userData);
  return res.body.data.id;
};
