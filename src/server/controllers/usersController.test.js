const User = require("../../database/models/User");
const { getAllUsers } = require("./usersController");

describe("Given a usersController", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("When it receives a request with the get method", () => {
    test("Then it should return a 200 status and a list of users", async () => {
      User.find = jest.fn().mockResolvedValue([1, 2]);
      const json = jest.fn();
      const next = jest.fn();
      const res = { status: () => res, json };

      await getAllUsers(null, res, next);

      expect(json).toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
    });
  });
});
