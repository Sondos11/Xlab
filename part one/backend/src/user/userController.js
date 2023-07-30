var userModel = require("./userModel");
const path = require("path");

var createUserControllerFn = async (req, res) => {
  try {
    const body = req.body;
    const userModelData = new userModel();
    userModelData.name = body.name;
    userModelData.mobile = body.mobile;
    userModelData.email = body.email;
    userModelData.image = body.image;
 
    userModelData.password = body.password;

    await userModelData.save();

    res.status(200).send({
      status: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { createUserControllerFn };
