import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResortDetails from "../components/ResortDetails";

const Resort = () => {
    const { id } = useParams()
    const [resort, setResort] = useState(null);

    useEffect(() => {
        const fetchResort = async () => {
            const response = await fetch(`/api/resorts/${id}`)
            const json = await response.json()

            if (response.ok) {
                setResort(json)
            }
        }

        fetchResort()
    }, [id])

    return (
        <div className="home">
            <div className="resorts">
            {resort && <ResortDetails resort={resort} />}
            </div>
        </div>
    )
}

export default Resort