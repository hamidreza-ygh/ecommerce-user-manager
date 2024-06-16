const express = require("express");
const AuthController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
const authController = new AuthController();

router.post("/login", (req, res) => authController.login(req, res));
router.post("/register", (req, res) => authController.register(req, res));
router.get("/dashboard", authMiddleware, (req, res) => res.json({ message: "Welcome to dashboard" }));
router.get("/users", (req, res) => authController.getUsers(req, res));
router.get("/auth", (req, res) => authController.verify(req, res));
router.options("/auth", (req, res) => authController.verify(req, res));


module.exports = router;
