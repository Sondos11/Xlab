var userModel = require("./userModel");
const multer = require("multer");
const path = require("path");

// Set up multer storage for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder where the images will be saved
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Rename the uploaded file with a unique name (e.g., timestamp + original name)
    const uniqueSuffix = Date.now() + "-" + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// Create multer upload instance with the defined storage configuration
const upload = multer({ storage: storage });

var createUserControllerFn = async (req, res) => {
  try {
    const body = req.body;
    const userModelData = new userModel();
    userModelData.name = body.name;
    userModelData.mobile = body.mobile;
    userModelData.email = body.email;
    // userModelData.image = body.image;
    if (req.file) {
      userModelData.image = req.file.path;
    }
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
