import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaHeart } from 'react-icons/fa';
import ResortDetails from "../components/ResortDetails";

const Resort = () => {
    const { id } = useParams()
    const [resort, setResort] = useState(null);
    const [averageRating, setAverageRating] = useState(null);
    const [totalFavorites, setTotalFavorites] = useState(null);

    useEffect(() => {
        const fetchResort = async () => {
            const response = await fetch(`/api/resorts/${id}`)
            const json = await response.json()

            if (response.ok) {
                setResort(json)
            }
        }

        fetchResort();
    }, [id])

    useEffect(() => {
        const fetchAverageRating = async () => {
            try {
                const response = await fetch(`/api/conditions/average-rating/${id}`);
                const data = await response.json();
                setAverageRating(data.averageRating ?? 0);
            } catch (error) {
                console.error('Error fetching rating:', error);
                setAverageRating(0);
            }
        }

        fetchAverageRating();
    }, [id])

    useEffect(() => {
        const fetchTotalFavorites = async () => {
            try {
                const response = await fetch(`/api/users/total-favorites/${id}`);
                const data = await response.json();
                setTotalFavorites(data[0]?.totalFavorites ?? 0);
            } catch (error) {
                console.error('Error fetching total favorites:', error)
                setTotalFavorites(0);
            }
        }

        fetchTotalFavorites();
    }, [id])

    return (
        <div className="home">
            <div className="resorts">
                {resort && <ResortDetails resort={resort} />}
                <p>
                    <strong>Average Rating: </strong>{averageRating === 0 ? 'No ratings yet' : averageRating} <FaStar className="star-icon" />
                </p>
                <p>
                    <strong>Total Favorites: </strong>{totalFavorites === 0 ? 'No favorites yet' : totalFavorites} <FaHeart className="heart-icon" />
                </p>
            </div>
        </div>
    )
}

export default Resort