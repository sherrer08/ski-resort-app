import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TrailsDetails from "../components/TrailsDetails";

const Trails = () => {
    const { resortId } = useParams()
    const [trails, setTrails] = useState([])

    useEffect(() => {
        const fetchTrails = async() => {
            const response = await fetch(`/api/trails/resort/${resortId}`)
            const json = await response.json()

            if (response.ok) {
                setTrails(json)
            }
        }
        
        fetchTrails()
    }, [resortId])

    return (
        <div className="home">
            <div className="resorts">
                {trails.length > 0 ? (
                    trails.map((trail) => (
                        <TrailsDetails key={trail._id} trail={trail} />
                    ))
                    ) : (
                    <p>No trails found for this resort.</p>
                    )}
            </div>
        </div>
    )
}

export default Trails