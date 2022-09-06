import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { SerieList, SerieAdd } from './components'

const connectSocketServer = () => {
    const socket = io.connect('http://localhost:4001', {
        transports: ['websocket'],
    })
    return socket
}

function App() {
    const [socket] = useState(connectSocketServer())
    const [onLine, setOnLine] = useState(false)
    const [series, setSeries] = useState([])

    useEffect(() => {
        setOnLine(socket.connected)
    }, [socket])

    useEffect(() => {
        socket.on('connect', () => {
            setOnLine(true)
        })
    }, [socket])

    useEffect(() => {
        socket.on('disconnect', () => {
            setOnLine(false)
        })
    }, [socket])

    useEffect(() => {
        socket.on('current-series', (data) => {
            setSeries(data)
        })
    }, [socket])

    const votar = (id) => {
        socket.emit('votar-serie', id)
    }

    const borrar = (id) => {
        socket.emit('borrar-serie', id)
    }

    const cambiarNombre = (id, name) => {
        socket.emit('cambiar-nombre-serie', { id, name })
    }

    const crearSerie = (name) => {
        socket.emit('crear-serie', name)
    }

    return (
        <div className="container">
            <div className="alert">
                <p>
                    Service status:
                    {onLine ? (
                        <span className="text-success"> Online</span>
                    ) : (
                        <span className="text-danger"> Offline</span>
                    )}
                </p>
            </div>

            <h1>SerieNames</h1>
            <hr />

            <div className="row">
                <div className="col-8">
                    <SerieList
                        data={series}
                        votar={votar}
                        borrar={borrar}
                        cambiarNombre={cambiarNombre}
                    />
                </div>
                <div className="col-4">
                    <SerieAdd crearSerie={crearSerie} />
                </div>
            </div>
        </div>
    )
}

export default App
