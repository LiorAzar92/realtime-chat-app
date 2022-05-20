import React from 'react'
import AppContext from '../contexts/AppContext'

const AppProvider = ({ children }) => {
    return (
        <AppContext.Provider >
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider
