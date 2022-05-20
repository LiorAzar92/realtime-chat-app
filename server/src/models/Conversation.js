import mongoose from 'mongoose';
import validator from 'validator';

const ConversationSchema = new mongoose.Schema(
    {
        members: {
            type: Array,
        },
    },
    { timestamps: true }
)



export default mongoose.model('Conversation', ConversationSchema);