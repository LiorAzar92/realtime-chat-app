import express from "express";
import messageController from '../controllers/messageController.js'

const router = express.Router();

router
    .route('/')
    .post(messageController.createMessage)

router
    .route('/:conversationId')
    .get(messageController.getMessages)

export default router;