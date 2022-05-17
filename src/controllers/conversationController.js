import Conversation from '../models/Conversation.js';
import { StatusCodes } from 'http-status-codes';

const createConversation = async (req, res) => {
    const { senderId, recieverId } = req.body;
    const newConversation = new Conversation({
        members: [senderId, recieverId]
    })
    const savedConversation = await newConversation.save();
    res
        .status(StatusCodes.CREATED)
        .json(savedConversation)
}

const getConvByUser = async (req, res) => {
    const conversations = await Conversation.find({
        memebers: { $in: [req.params.userId] }
    })
    res
        .status(StatusCodes.OK)
        .json(conversations)
}

export default { createConversation, getConvByUser };