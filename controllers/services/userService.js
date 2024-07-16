// controllers/services/userService.js
const Residence = require("../../models/residence");
const Employee = require("../../models/employee");
const User = require("../../models/user");

const getUserDataById = async (userId) => {
  try {
    let user = await Residence.findOne({ _id: userId });

    if (!user) {
      user = await Employee.findOne({ _id: userId });
    }

    if (userId === "6564d331523a023dbf2634ac") {
      user = await User.findOne({ uid: userId });
    }

    if (!user) {
      throw new Error("User not found");
    }

    let userType, userData;

    if (user instanceof Residence) {
      userType = "RESIDENCE";
      userData = user;
    } else if (user instanceof Employee) {
      userType = user.employeeCatergory || "EMPLOYEE";
      userData = user;
    } else {
      userType = "ADMIN";
      userData = user;
    }

    return { userType, userData };
  } catch (error) {
    throw new Error(`Error getting user data: ${error.message}`);
  }
};

module.exports = { getUserDataById };
