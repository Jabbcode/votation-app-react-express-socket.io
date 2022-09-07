import { SocketContext } from '../context/SocketContext'
import { useContext } from 'react'

import { SerieList, SerieAdd } from '../components'
import { SerieChart } from '../components/SerieChart'

function HomePage() {
    const { onLine } = useContext(SocketContext)

    console.log(onLine)

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
                <div className="col">
                    <SerieChart />
                </div>
            </div>

            <div className="row">
                <div className="col-8">
                    <SerieList />
                </div>
                <div className="col-4">
                    <SerieAdd />
                </div>
            </div>
        </div>
    )
}

export default HomePage
