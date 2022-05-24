import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Conversation from './Conversation'
import useAuth from '../hooks/useAuth';

const Chats = () => {
    const { activeUser, conversations, getConvByUser } = useAuth();

    useEffect(() => {
        const getConversations = async () => {
            getConvByUser(activeUser._id)
        }
        getConversations()
    }, [activeUser._id])

    return (
        <Container>
            {
                conversations.map(conversation => (
                    <Conversation key={conversation._id} conversation={conversation} />
                ))
            }
        </Container>
    )
}

export default Chats
