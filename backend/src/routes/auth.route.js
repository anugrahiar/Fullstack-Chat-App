import express from "express"
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login );

router.post("/logout", logout );

router.put("/update-profile", protectRoute, updateProfile);   //protectRoute is a middleware thats is used to authenticate the user efore updating the profile pic by checking the user token

router.get("/check", protectRoute, checkAuth); //final authentication   we call this checkauth fucntion when we refresh our application

export default router;