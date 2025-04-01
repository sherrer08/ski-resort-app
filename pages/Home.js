import { useEffect, useState } from "react"

import HomeDetails from "../components/HomeDetails"

const Home = () => {
    const [resorts, setResorts] = useState(null)

    useEffect(() => {
        const fetchResorts = async () => {
            const response = await fetch('/api/resorts')
            const json = await response.json()

            if (response.ok) {
                setResorts(json)
            }
        }

        fetchResorts()
    }, [])

    return (
        <div className="home">
            <div className="resorts">
                {resorts && resorts.map((resort) => (
                    <HomeDetails key={resort._id} resort={resort}/>
                ))}
            </div>
        </div>
    )
}

export default Home