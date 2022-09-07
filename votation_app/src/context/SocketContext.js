import React, { createContext } from 'react'
import { useSocket } from '../hooks/useSocket'

export const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
    const [socket, onLine] = useSocket('http://localhost:4001')

    return (
        <SocketContext.Provider value={{ socket, onLine }}>
            {children}
        </SocketContext.Provider>
    )
}
