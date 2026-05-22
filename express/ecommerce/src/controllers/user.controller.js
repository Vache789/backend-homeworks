const userService = require("../services/user.service.js");

function getAllUsers(req, res) {
  const users = userService.getAll();
  res.status(200).json(users);
}

function registerUser(req, res) {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email, and password are required" });
    }

    const newUser = userService.register({ username, email, password, role });

    if (newUser && newUser.error) {
      return res.status(400).json({ message: newUser.error });
    }

    if (!newUser) {
      return res
        .status(500)
        .json({ message: "Internal Server Error while saving user" });
    }

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = userService.login(email, password);

    if (user && user.error) {
      return res.status(401).json({ message: user.error });
    }

    res.status(200).json({
      message: "Login successful",
      user: user,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

function updateUser(req, res) {
  const updatedUser = userService.update(req.params.id, req.body);

  if (!updatedUser) {
    return res
      .status(404)
      .json({ message: "User not found or could not update" });
  }

  res.status(200).json(updatedUser);
}

function deleteUser(req, res) {
  const success = userService.remove(req.params.id);

  if (!success) {
    return res
      .status(404)
      .json({ message: "User not found or could not delete" });
  }

  res.status(200).json({ message: "User successfully deleted" });
}

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
