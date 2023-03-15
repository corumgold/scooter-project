const User = require("./User");
const Scooter = require("./Scooter");

class ScooterApp {
  constructor() {
    this.stations = { station1: [], station2: [], station3: [] };
    this.registeredUsers = {};
  }

  registerUser(username, password, age) {
    if (age < 18) throw new Error("User must be 18 or older");
    if (Object.keys(this.registeredUsers).includes(username)) {
      console.log("Username already registered");
      return this.registeredUsers[username];
    } else {
      let user = new User(username, password, age);
      this.registeredUsers[username] = user;
    }
  }

  loginUser(username, password) {
    if (!Object.keys(this.registeredUsers).includes(username)) {
      throw new Error("User not found");
    }
    if (this.registeredUsers[username].password !== password) {
      throw new Error("Password incorrect");
    }
    console.log(this.registeredUsers[username].__proto_);
    this.registeredUsers[username].login(password);
    console.log("User has been logged in");
  }

  logoutUser(username) {
    if (!Object.keys(this.registeredUsers).includes(username)) {
      throw new Error("User not found");
    }
    this.registeredUsers[username].logout();
    console.log(`${username} has been logged out`);
  }

  createScooter(station) {
    if (!Object.keys(this.stations).includes(station)) {
      throw new Error("Station not found");
    }
    const createdScooter = new Scooter(station);
    this.stations[station].push(createdScooter);
  }

  rentScooter(scooterObj, user) {
    let foundStation = null;
    for (const station in this.stations) {
      if (this.stations[station].length) {
        this.stations[station].map((scooter) => {
          if (scooter.serial === scooterObj.serial) {
            foundStation = this.stations[station];
            foundStation.splice(foundStation.indexOf(scooter), 1);
            scooter.user = this.registeredUsers[user];
            console.log("Scooter Rented");
          }
        });
      }
    }
    if (!foundStation) throw new Error("Scooter already rented");
  }

  dockScooter(scooterObj, station) {
    if (!Object.keys(this.stations).includes(station)) {
      throw new Error("Station not found");
    }
    if (this.stations[station].includes(scooterObj)) {
      throw new Error("Scooter already at station");
    }
    scooterObj.station = station;
    this.stations[station].push(scooterObj);
  }
}

module.exports = ScooterApp;
