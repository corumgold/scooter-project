const User = require("../src/User");

// User tests here
describe("User object", () => {
  const user1 = new User("Alan12", "scooter4lyfe", 30);

  test("User instance is an object", () => {
    expect(typeof user1).toEqual("object");
  });

  test("User has all expected properties", () => {
    expect(user1.hasOwnProperty("username")).toBe(true);
    expect(user1.hasOwnProperty("password")).toBe(true);
    expect(user1.hasOwnProperty("age")).toBe(true);
    expect(user1.hasOwnProperty("loggedIn")).toBe(true);
  });

  test("All new users are NOT logged in initially", () => {
    expect(user1.loggedIn).toBe(false);
  });

  test("User takes 3 parameter, 'username', 'password', and 'age'", () => {
    expect(user1.username).toBe("Alan12");
    expect(user1.password).toBe("scooter4lyfe");
    expect(user1.age).toBe(30);
  });
});

describe("user methods", () => {
  let user1;

  beforeEach(() => {
    user1 = new User("Cory", "abc123", 27);
  });

  // test login
  test("If password is correct, login method logs the user in. If not, throws incorrect password error", () => {
    expect(() => user1.login("123abc")).toThrow("Password is incorrect");
    user1.login("abc123");
    expect(user1.loggedIn).toBe(true);
  });

  // test logout
  test("logout method logs the user out", () => {
    user1.logout();
    expect(user1.loggedIn).toBe(false);
  });
});
