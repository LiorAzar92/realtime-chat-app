import axios from "axios";
import { useEffect, useState } from "react"
import AppContext from "../contexts/AppContext";
import localforage from "localforage";

const AppProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [alertType, setAlertType] = useState('');
    const [activeUser, setActiveUser] = useState(null);
    const [closeModal, setCloseModal] = useState(true);
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);

    const authFetch = axios.create({
        baseURL:
            process.env.NODE_ENV !== 'production' &&
            'http://localhost:8000/api'
        ,
        withCredentials: true
    })

    useEffect(() => {
        localforage.getItem('auth').then(data => {
            data && setIsAuth(data);
        })
        localforage.getItem('user').then(data => {
            data && setActiveUser(JSON.parse(data));
        })
        setTimeout(() => {
            setIsLoading(true)
        }, 50);
    }, [])

    const displayAlert = (text, type) => {
        setAlertText(text);
        setAlertType(type);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2500);
    }

    const signUpUser = async (recievedUser) => {
        const url = `/auth/register`
        try {
            await authFetch.post(url, recievedUser);
            displayAlert('User created! redirecting...', 'success');
            setTimeout(() => {
                setCloseModal(!closeModal);
            }, 2500);
        } catch (error) {
            console.log(error.response.data.msg);
            displayAlert(error.response.data.msg, 'danger')
        }
    }

    const loginUser = async (recievedUser) => {
        const url = `/auth/login`
        try {
            const response = await authFetch.post(url, recievedUser);
            const { user } = response.data;
            displayAlert('User login! redirecting...', 'success');
            setActiveUser(user);
            setTimeout(() => {
                setIsAuth(!isAuth);
                setCloseModal(!closeModal);
            }, 2500);
            addUserToLocalStorage({ user });
        } catch (error) {
            console.log(error.response.data.msg);
            displayAlert(error.response.data.msg, 'danger')
        }
    }

    const updateUser = async (userId, recievedUser) => {
        let url = `/auth/user/${userId}`
        try {
            const { data } = await authFetch.put(url, recievedUser);
            const { user } = data;
            displayAlert('User data has been changed!', 'success');
            setActiveUser(user);
            addUserToLocalStorage({ user });
        } catch (error) {
            if (error.response.status !== 401) {
                console.log(error.response.data.msg);
                displayAlert(error.response.data.msg, 'danger')
            }
        }
    }

    const logoutUser = async () => {
        const url = `/auth/logout`
        try {
            await authFetch.get(url);
            setActiveUser(null);
            setIsAuth(false);
            removeUserToLocalStorage({ activeUser })
        } catch (error) {
            console.log(error.response.data.msg);
            displayAlert(error.response.data.msg, 'danger')
        }
    }

    const addUserToLocalStorage = ({ user, token }) => {
        localforage.setItem('user', JSON.stringify(user));
        localforage.setItem('auth', true);
    }

    const removeUserToLocalStorage = () => {
        localforage.removeItem('auth');
        localforage.removeItem('user');
    }

    const getConvByUser = async (userId) => {
        const url = `/conversation/${userId}`
        try {
            const { data } = await authFetch.get(url);
            console.log(data)
            setConversations(data)
        } catch (error) {
            console.log(error.response.data.msg);
        }
    }

    const getMessagesById = async (conversationId, setFunction) => {
        const url = `/message/${conversationId}`
        try {
            const res = await authFetch.get(url);
            setFunction(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getFriendById = async (userId, setFunction) => {
        const url = `/auth/user/${userId}`;
        try {
            const { data } = await authFetch.get(url);
            const { user } = data;
            setFunction(user);
        } catch (error) {
            console.log(error.response);
        }
    }

    return (
        <AppContext.Provider
            value={{
                isAuth,
                setIsAuth,
                showAlert,
                setShowAlert,
                alertText,
                setAlertText,
                alertType,
                setAlertType,
                displayAlert,
                signUpUser,
                loginUser,
                updateUser,
                activeUser,
                logoutUser,
                closeModal,
                conversations,
                getConvByUser,
                getFriendById,
                setCurrentChat,
                currentChat,
                getMessagesById
            }}>
            {
                isLoading &&
                children
            }
        </AppContext.Provider>
    )
}

export default AppProvider
