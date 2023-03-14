const Scooter = require("../src/Scooter");
const User = require("../src/User");
// const User = require("../src/User");

//typeof scooter === object
describe("Scooter object", () => {
  const scooter1 = new Scooter("Union Square");
  const scooter2 = new Scooter("Chelsea Piers");
  const scooter3 = new Scooter("MSG");

  test("Scooter instance is an object", () => {
    expect(typeof scooter1).toEqual("object");
  });

  test("Scooter has all expected properties", () => {
    expect(scooter1.hasOwnProperty("station")).toBe(true);
    expect(scooter1.hasOwnProperty("user")).toBe(true);
    expect(scooter1.hasOwnProperty("serial")).toBe(true);
    expect(scooter1.hasOwnProperty("station")).toBe(true);
    expect(scooter1.hasOwnProperty("station")).toBe(true);
  });

  test("Scooter serial numbers auto-increment based on nextSerial", () => {
    expect(scooter2.serial).toBe(scooter1.serial + 1);
    expect(scooter3.serial).toBe(scooter2.serial + 1);
    expect(Scooter.nextSerial).toBe(scooter3.serial + 1);
  });

  test("All Scooters are docked, charged, and in good repair initially.", () => {
    expect(scooter2.station).not.toBe(undefined);
    expect(scooter3.charge).toBe(100);
    expect(scooter3.isBroken).toBe(false);
  });

  test("Scooter takes one parameter, 'station'", () => {
    expect(new Scooter("Heathrow").station).toBe("Heathrow");
  });
});

//Method tests
describe("scooter methods", () => {
  const testUser = new User("Cory", 'abc123', 27);
  let scooter1;
  let scooter2;
  let scooter3;
  beforeEach(() => {
    scooter1 = new Scooter("Atlanta");
    scooter2 = new Scooter("Columbus");
    scooter3 = new Scooter("Salt Lake City");
  });

  //rent method
  test("If scooter is charged above 20% and not broken, remove from station and check out to user", () => {
    scooter1.charge = 20;
    scooter2.isBroken = true;

    expect(() => scooter1.rent("Sam")).toThrow("Scooter needs to charge!");
    expect(() => scooter2.rent("Nancy")).toThrow("Scooter needs repairs!");

    scooter3.rent(testUser);

    expect(scooter3.user).toBe(testUser);
  });
  //dock method
  test("Docking a scooter should return it to the station and remove the user", () => {
    scooter3.dock("Salt Lake City");

    expect(scooter3.station).toBe("Salt Lake City");
    expect(scooter3.user).toBe(null);
  });
  //requestRepair method
  //charge method
});
