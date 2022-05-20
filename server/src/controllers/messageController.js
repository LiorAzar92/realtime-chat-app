import Message from '../models/Message.js';
import { StatusCodes } from 'http-status-codes';

const createMessage = async (req, res) => {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();
    res
        .status(StatusCodes.CREATED)
        .json(savedMessage)
}

const getMessages = async (req, res) => {
    const messages = await Message.find({
        conversationId: req.params.conversationId
    }).sort('createdAt')
    res
        .status(StatusCodes.OK)
        .json(messages)
}

export default { createMessage, getMessages };