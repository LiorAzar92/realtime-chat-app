import React from 'react'
import AuthContext from './contexts/AuthContext'

const AuthProvider = ({ children }) => {
    return (
        <AuthContext.Provider >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
