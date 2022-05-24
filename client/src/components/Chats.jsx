import React, { useEffect, useRef, useState } from 'react'
import { Container } from 'react-bootstrap'
import Conversation from './Conversation'
import useAuth from '../hooks/useAuth';
import './Chats.css'
import Message from './Message';

const Chats = () => {
    const { activeUser, conversations, getConvByUser, setCurrentChat, currentChat, getMessagesById } = useAuth();

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const scrollRef = useRef();

    useEffect(() => {
        const getConversations = async () => {
            await getConvByUser(activeUser._id)
        }
        getConversations()
    }, [])

    useEffect(() => {
        const getMessages = async () => {
            await getMessagesById(currentChat._id, setMessages)
        };
        currentChat && getMessages();
    }, [currentChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: activeUser._id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        const receiverId = currentChat.members.find(
            (member) => member !== activeUser._id
        );

        // socket.current.emit("sendMessage", {
        //     senderId: activeUser._id,
        //     receiverId,
        //     text: newMessage,
        // });

        // try {
        //     const res = await axios.post("/messages", message);
        //     setMessages([...messages, res.data]);
        //     setNewMessage("");
        // } catch (err) {
        //     console.log(err);
        // }
    };

    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    {conversations.map((c) => (
                        <div key={c._id} onClick={() =>
                            setCurrentChat(c)
                        }>
                            <Conversation conversation={c} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {currentChat ? (
                        <>
                            <div className="chatBoxTop">
                                {messages.map((m) => (
                                    <div ref={scrollRef}>
                                        <Message message={m} own={m.sender === activeUser._id} />
                                    </div>
                                ))}
                            </div>
                            <div className="chatBoxBottom">
                                <textarea
                                    className="chatMessageInput"
                                    placeholder="write something..."
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    value={newMessage}
                                ></textarea>
                                <button className="chatSubmitButton" onClick={handleSubmit}>
                                    Send
                                </button>
                            </div>
                        </>
                    ) : (
                        <span className="noConversationText">
                            Open a conversation to start a chat.
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Chats
