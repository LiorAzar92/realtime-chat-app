import express from "express";
import authController from "../controllers/authController.js";
import validateEmailAndPassword from "../middlewares/validateEmailAndPassword.js";

const router = express.Router();

router
    .route('/register')
    .post(authController.register)
router
    .route('/login')
    .post(validateEmailAndPassword, authController.login)
router
    .route('/logout')
    .get(authController.logout)
router
    .route('/user/:id')
    .get(authController.getUserById)

export default router;