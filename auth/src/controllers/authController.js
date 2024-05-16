const AuthService = require("../services/authService");

/**
 * Class to encapsulate the logic for the auth routes
 */

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async login(req, res) {
    const { username, password } = req.body;

    const result = await this.authService.login(username, password);

    if (result.success) {
      res.json({ token: result.token, username:result.username, id: result.id});
    } else {
      res.status(500).json({ error: result.error });
    }
  }

  async register(req, res) {
    const user = req.body;
  
    try {
      // const existingUser = await this.authService.findUserByUsername(user.username);
  
      // if (existingUser) {
      //   console.log("Username already taken")
      //   throw new Error("Username already taken");
      // }
      
      const result = await this.authService.register(user);
      res.json({success: result.success , message: `${result.username} has created`, id: result.id});
    } catch (err) {
      // res.status(500).json({ message: err.message });
      res.status(500).json(err);
    }
  }

  async getProfile(req, res) {
    const userId = req.user.id;

    try {
      const user = await this.authService.getUserById(userId);
      res.json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getUsers(req, res) {

    try {
      console.log("authService", this.authService);
      const users = await this.authService.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = AuthController;
