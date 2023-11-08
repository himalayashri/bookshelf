const express = require('express');
const router = express.Router();
const validationMiddleware = require("../middleware/validationMiddleware")
const userController = require("../controllers/UserController")

router.post("/createuser", validationMiddleware, userController.createUser);
router.post("/loginuser", validationMiddleware, userController.loginUser);
router.post("/update", userController.wantToRead);
router.post("/remove", userController.removeBook);

module.exports = router;

