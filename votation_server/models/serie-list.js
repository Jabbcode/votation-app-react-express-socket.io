const Serie = require('./serie')

class SerieList {
    constructor() {
        this.series = [
            new Serie('One Piece'),
            new Serie('Naruto'),
            new Serie('Bleach'),
            new Serie('Hunter x Hunter'),
        ]
    }

    addSerie(name) {
        const newSerie = new Serie(name)
        this.series.push(newSerie)
        return this.series
    }

    removeSerie(id) {
        this.series = this.series.filter((serie) => serie.id !== id)
    }

    getSeries() {
        return this.series
    }

    increaseVotes(id) {
        this.series = this.series.map((serie) => {
            if (serie.id === id) {
                serie.votes += 1
            }

            return serie
        })
    }

    changeName(id, newName) {
        this.series = this.series.map((serie) => {
            if (serie.id === id) {
                serie.name = newName
            }

            return serie
        })
    }
}

module.exports = SerieList
