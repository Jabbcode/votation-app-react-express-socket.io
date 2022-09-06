import { useState } from 'react'

export const SerieAdd = ({crearSerie}) => {
    const [valor, setValor] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if(valor.trim().length > 0) {
            crearSerie(valor)
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
