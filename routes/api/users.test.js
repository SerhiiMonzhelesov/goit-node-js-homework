const mongoose = require("mongoose");
const request = require("supertest");
const bcryptjs = require("bcryptjs");

const app = require("../../app");
const { User } = require("../../models/user");
const { DB_HOST_TEST, PORT } = process.env;

describe("test routes", () => {
  let server = null;
  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_HOST_TEST);
  });
  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });
  afterEach(async () => {
    await User.deleteMany({});
  });

  test("test login route", async () => {
    const password = await bcryptjs.hash("111111", 10);
    const newUser = {
      name: "testName",
      email: "test@test.com",
      password: `${password}`,
    };

    const user = await User.create(newUser);

    const loginUser = {
      email: "test@test.com",
      password: "111111",
    };

    const res = await request(app).post("/api/users/login").send(loginUser);
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeTruthy();
    const { token } = await User.findById(user._id);
    expect(res.body.token).toBe(token);
    expect(res.body.user).toHaveProperty("email");
    expect(typeof res.body.user.email).toBe("string");
  });
});
