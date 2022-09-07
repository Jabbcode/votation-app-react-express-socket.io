import { SocketProvider } from './context/SocketContext'
import HomePage from './Pages/HomePage'

export const SeriesNamesApp = () => {
    return (
        <SocketProvider>
            <HomePage />
        </SocketProvider>
    )
}
