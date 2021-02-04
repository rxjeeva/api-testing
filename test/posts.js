require('dotenv').config
import request from '../config/common';
const faker = require('faker');
import { expect } from "chai";
import { createRandomUser } from "../helper/user_helper";
const TOKEN =
  "ba8164f924992382db00d039a06ac3f107f2203f879086c03d6ba456036b825d";

describe("User Posts", () => {
  let postId, userId;

  before(async () => {
    userId = await createRandomUser();
  });

  it("/posts", async () => {
    const data = {
      user_id: userId,
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(),
    };

    const postRes = await request
      .post("posts")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(data);
    expect(postRes.body.data).to.deep.include(data);
    postId = postRes.body.data.id;
  });

  it("GET/POSTS/:id", async () => {
    await request
      .get(`posts/${postId}`)
      .set("Authorization", `Bearer ${TOKEN}`)
      .expect(200);
  });
});

describe('negative test', () => {
  it('401 authetication failed', async () => {
    const data = {
      user_id: 4,
      title: "My Title",
      body: "my blog post",
    }
    const postRes = await request
      .post('posts')
      .send(data);
    expect(postRes.body.code).to.eq(401);
    expect(postRes.body.data.message).to.eq('Authentication failed');
  })

  it('422 validation failed', async () => {
    const data = {
      user_id: 4,
      title: "My Title",
    }
    const postRes = await request
      .post('posts')
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(data);
  
    expect(postRes.body.code).to.eq(422);
    expect(postRes.body.data[0].field).to.eq('body');
    expect(postRes.body.data[0].message).to.eq("can't be blank");
  })
})