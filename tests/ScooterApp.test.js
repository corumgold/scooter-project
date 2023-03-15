const Scooter = require("../src/Scooter").default;
const User = require("../src/User");
const ScooterApp = require("../src/ScooterApp");

// ScooterApp tests here
describe("Scooter app object", () => {
  const app = new ScooterApp();

  test("Scooter app initializes with empty stations and an empty registered users array", () => {
    expect(Object.keys(app.stations)).toEqual([
      "station1",
      "station2",
      "station3",
    ]);

    expect(app.registeredUsers).toEqual({});
  });
});

describe("Scooter app methods", () => {
  const app = new ScooterApp();
  // register user
  describe("Register user", () => {
    app.registerUser("Sam", "sam123", 21);

    test("If a user is too young to register, app should throw the appropriate error", () => {
      expect(() => app.registerUser("Betty", "betty123", 17)).toThrow(
        "User must be 18 or older"
      );
    });

    test("If a user is already registered, return the registered user", () => {
      expect(app.registerUser("Sam", "sam456", 24)).toBe(
        app.registeredUsers["Sam"]
      );
    });
  });
  // log in
  describe("loginUser", () => {
    test("If user doesn't exist, throw the appropriate error", () => {
      expect(() => app.loginUser("Sammy", "sammy123")).toThrow(
        "User not found"
      );
    });

    test("If user password is incorrect, throw the appropriate error", () => {
      expect(() => app.loginUser("Sam", "sam456")).toThrow(
        "Password incorrect"
      );
    });

    test("If user credentials are correct, login the user", () => {
      app.loginUser("Sam", "sam123");
      expect(app.registeredUsers["Sam"].loggedIn).toBe(true);
    });
  });

  // log out
  describe("logout user", () => {
    test("If the user can't be located, throw appropriate error", () => {
      expect(() => app.logoutUser("Betty")).toThrow("User not found");
    });

    test("should logout the user if found", () => {
      expect(() => app.logoutUser("Sam")).not.toThrow("User not found");
    });
  });
  //create scooter
  describe("create scooter", () => {
    test("should throw an error if station not found", () => {
      expect(() => app.createScooter("station4")).toThrow("Station not found");
    });
    test("should create a new scooter and add it to the appropriate station", () => {
      app.createScooter("station1");
      expect(app.stations.station1.length).not.toBe(0);
    });
  });
  // rent scooter
  describe("rent scooter", () => {
    test("should rent a scooter if it's available", () => {
      app.createScooter("station1");
      expect(() =>
        app.rentScooter(
          {
            station: "station1",
            user: null,
            serial: 1,
            charge: 100,
            isBroken: false,
          },
          "Sam"
        )
      ).not.toThrow();
    });

    test("should throw an error if the scooter is already rented", () => {
      expect(() =>
        app.rentScooter(
          {
            station: "station1",
            user: null,
            serial: 1,
            charge: 100,
            isBroken: false,
          },
          "Sam"
        )
      ).toThrow("Scooter already rented");
    });
  });

  // dock scooter
  describe("dock scooter", () => {
    test("should throw an error if station not found", () => {
      expect(() => app.createScooter("station4")).toThrow("Station not found");
    });
  });
});
