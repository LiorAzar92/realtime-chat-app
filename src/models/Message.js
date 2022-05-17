import mongoose from 'mongoose';
import validator from 'validator';

const MessageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: String
        },
        sender: {
            type: String
        },
        text: {
            type: String
        }
    },
    { timestamps: true }
)


export default mongoose.model('Message', MessageSchema);