import express from "express";
import conversationController from "../controllers/conversationController.js";

const router = express.Router();

router
    .route('/')
    .post(conversationController.createConversation)
router
    .route('/:userId')
    .get(conversationController.getConvByUser)

export default router;