jest.mock("./loginController");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const databaseConnect = require("../../database/index");
const User = require("../../database/models/User");
const loginUser = require("./loginController");

let mongoServer;

jest.mock("../../database/models/User");

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const dbCredential = mongoServer.getUri();
  await databaseConnect(dbCredential);
});
beforeEach(async () => {
  const newPass = await bcrypt.hash("1234", 10);
  jest.resetAllMocks();

  await User.create({
    username: "dafucka84",
    name: "Ramon",
    password: newPass,
    admin: true,
    series: [],
  });
});
afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given a userLogin controller", () => {
  describe("When it recieves a response", () => {
    test("Then it should call json method of the response", async () => {
      const res = {
        json: jest.fn(),
      };
      const request = { username: "dafa84", password: "123546" };
      const next = jest.fn();
      await loginUser(request, res, next);

      expect(next).not.toHaveBeenCalled();
    });
  });
});
