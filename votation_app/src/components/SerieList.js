import { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/SocketContext'

export const SerieList = () => {
    const [series, setSeries] = useState([])
    const { socket } = useContext(SocketContext)

    useEffect(() => {
        socket.on('current-series', (data) => {
            setSeries(data)
        })

        return () => socket.off('current-series')
    }, [socket])

    const handleName = (e, id) => {
        const newName = e.target.value

        setSeries((series) =>
            series.map((serie) => {
                if (serie.id === id) {
                    serie.name = newName
                }

                return serie
            })
        )
    }

    const votar = (id) => {
        socket.emit('votar-serie', id)
    }

    const borrar = (id) => {
        socket.emit('borrar-serie', id)
    }

    const onPerdioFoco = (id, name) => {
        socket.emit('cambiar-nombre-serie', { id, name })
    }

    const crearRows = () => {
        return series.map((serie) => (
            <tr key={serie.id}>
                <td>
                    <button
                        className="btn btn-primary"
                        onClick={() => votar(serie.id)}
                    >
                        +1
                    </button>
                </td>
                <td>
                    <input
                        className="form-control"
                        value={serie.name}
                        onChange={(e) => handleName(e, serie.id)}
                        onBlur={() => onPerdioFoco(serie.id, serie.name)}
                    />
                </td>
                <td>
                    <h3> {serie.votes} </h3>
                </td>
                <td>
                    <button
                        className="btn btn-danger"
                        onClick={() => borrar(serie.id)}
                    >
                        Borrar
                    </button>
                </td>
            </tr>
        ))
    }

    return (
        <>
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Votos</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>{crearRows()}</tbody>
            </table>
        </>
    )
}
