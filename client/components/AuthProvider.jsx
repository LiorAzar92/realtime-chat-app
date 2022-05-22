import axios from "axios";
import { useEffect, useState } from "react"
import AppContext from "../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false); AsyncStorage
    const [alertText, setAlertText] = useState('');
    const [alertType, setAlertType] = useState('');
    const [activeUser, setActiveUser] = useState(null);

    const authFetch = axios.create({
        baseURL:
            process.env.NODE_ENV !== 'production' &&
            'http://localhost:8000/api'
        ,
        withCredentials: true
    })

    useEffect(() => {
        AsyncStorage.getItem('auth').then(data => {
            data && setIsAuth(data);
        })
        AsyncStorage.getItem('user').then(data => {
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
            setAction(!action);
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
        AsyncStorage.setItem('user', JSON.stringify(user));
        AsyncStorage.setItem('auth', true);
    }

    const removeUserToLocalStorage = () => {
        AsyncStorage.removeItem('auth');
        AsyncStorage.removeItem('user');
    }

    return (
        <AppContext.Provider
            value={{
                isAuth
            }}>
            {
                isLoading &&
                children
            }
        </AppContext.Provider>
    )
}

export default AppProvider
