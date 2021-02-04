import supertest from "supertest";
const request = supertest("https://gorest.co.in/public-api/");
import { expect } from "chai";
const TOKEN =
  "ba8164f924992382db00d039a06ac3f107f2203f879086c03d6ba456036b825d";

describe("Users", () => {
  let userId;
  describe("POST", () => {
    it("post/users", () => {
      const data = {
        email: `test-${Math.floor(Math.random() * 9999)}@mail.ca`,
        name: "Test name",
        gender: "Male",
        status: "Active",
      };

      return request
        .post("users")
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
          expect(res.body.data).to.deep.include(data);
          userId = res.body.data.id;
        });
    });
  });

  describe("GET", () => {
    it(`get/users/${userId}`, () => {
      const url = `users/${userId}?access-token=${TOKEN}`;
      return request.get(url).then((res) => {
        expect(res.body.data.id).to.be.eq(userId);
      });
    });

    it("get/users", () => {
      return request.get(`users?access-token=${TOKEN}`).then((res) => {
        expect(res.body.data).not.to.be.empty;
      });
    });

    it("get/users with query parameters", () => {
      const url = `users?access-token=${TOKEN}&page=4&gender=female&status=active`;
      return request.get(url).then((res) => {
        expect(res.body.data).not.to.be.null;
        res.body.data.forEach((data) => {
          expect(data.gender).to.be.eq("Female");
          expect(data.status).to.be.eq("Active");
        });
      });
    });
  });

  describe("PUT", () => {
    it("put/users/:id", () => {
      const data = {
        status: "Active",
        name: `Luffy  - ${Math.floor(Math.random() * 9999)}`,
      };
      return request
        .put(`users/${userId}`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
          expect(res.body.data).to.deep.include(data);
        });
    });
  });

  describe("DELETE", () => {
    it("delete/users/:id", () => {
      return request
        .delete(`/users/${userId}`)
        .set("Authorization", `Bearer ${TOKEN}`)
        .then((res) => {
          expect(res.body.data).to.eq(null);
        });
    });
  });
});
