import { useContext, useState } from 'react'
import { SocketContext } from '../context/SocketContext'

export const SerieAdd = () => {

    const { socket } = useContext(SocketContext)
    const [valor, setValor] = useState('')
    
    const onSubmit = (e) => {
        e.preventDefault()

        if (valor.trim().length > 0) {
            socket.emit('crear-serie', valor)
            setValor('')
        }
    }
    
    return (
        <>
            <h3>Agregar Serie</h3>
            <form onSubmit={onSubmit}>
                <input
                    placeholder="Nuevo nombre de serie"
                    className="form-control"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                />
            </form>
        </>
    )
}
