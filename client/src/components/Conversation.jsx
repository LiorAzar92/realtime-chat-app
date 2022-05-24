import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import './Conversation.css'

const Conversation = ({ conversation }) => {
    const { activeUser, getFriendById } = useAuth();

    const [friend, setFriend] = useState(null);


    useEffect(() => {
        const friendId = conversation.members.find(m => m !== activeUser._id)
        getFriendById(friendId, setFriend)
    }, [])

    return (
        <div className="conversation">
            <img
                className="conversationImg"
                src={
                    friend?.profilePicture
                        ? friend.profilePicture
                        : 'https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png'
                }
                alt=""
            />
            <span className="conversationName">{friend?.name}</span>
        </div>
    )
}

export default Conversation
