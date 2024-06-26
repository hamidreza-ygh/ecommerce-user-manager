// const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const authRouter = require("./routes/authRoutes");
const AuthController = require("./controllers/authController");

class App {
  constructor() {
    this.app = express();
    // this.app.use(cors());
    this.authController = new AuthController();
    this.connectDB();
    this.setMiddlewares();
    this.setRoutes();
  }

  // async connectDB() {
  //   await mongoose.connect(config.mongoURI, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   });
  //   console.log("MongoDB connected");
  // }

  async connectDB() {
    try{
      await mongoose.connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected");
    } catch(error) {
      console.log("MongoDB error:", error);
    }
    
  }

  async disconnectDB() {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  }

  setMiddlewares() {
    // this.app.use((req, res, next) => {
    //   if (req.method === 'OPTIONS') {
    //     res.status(200).json({ message: 'OPTIONS Request' });
    //   } else {
    //     // Continue with authentication
    //     next();
    //   }
    // });
    this.app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specific methods
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-User'); // Allow specific headers
      next();
    });
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  setRoutes() {
    // this.app.post("/login", (req, res) => this.authController.login(req, res));
    // this.app.post("/register", (req, res) => this.authController.register(req, res));
    // this.app.get("/dashboard", authMiddleware, (req, res) => res.json({ message: "Welcome to dashboard" }));
    // this.app.get("/users", (req, res) => this.authController.getUsers(req, res));
    // this.app.get("/auth", (req, res) => this.authController.verify(req, res));
    // this.app.options("/auth", (req, res) => this.authController.verify(req, res));

    this.app.use("/authentication", authRouter);
  }

  start() {
    this.server = this.app.listen(3000, () => console.log("Server started on port 3000"));
  }

  async stop() {
    await mongoose.disconnect();
    this.server.close();
    console.log("Server stopped");
  }
}

module.exports = App;
