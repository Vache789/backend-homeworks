const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");

router.get("/", userController.getAllUsers);

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;
