const SerieList = require('./serie-list')

class Sockets {
    constructor(io) {
        this.io = io

        this.serieList = new SerieList()

        this.socketEvents()
    }

    socketEvents() {
        // On Connection
        this.io.on('connection', (socket) => {
            console.log('Cliente conectado')

            // Emitir al cliente conectados todas las series actuales
            socket.emit('current-series', this.serieList.getSeries())

            // Votar por la serie
            socket.on('votar-serie', (id) => {
                this.serieList.increaseVotes(id)
                this.io.emit('current-series', this.serieList.getSeries())
            })

            // Borrar serie
            socket.on('borrar-serie', (id) => {
                this.serieList.removeSerie(id)
                this.io.emit('current-series', this.serieList.getSeries())
            })

            // Cambiar el nombre de una serie
            socket.on('cambiar-nombre-serie', ({ id, name }) => {
                this.serieList.changeName(id, name)
                this.io.emit('current-series', this.serieList.getSeries())
            })

            // Agregar nueva serie
            socket.on('crear-serie', (name) => {
                this.serieList.addSerie(name)
                this.io.emit('current-series', this.serieList.getSeries())
            })
        })
    }
}

module.exports = Sockets
