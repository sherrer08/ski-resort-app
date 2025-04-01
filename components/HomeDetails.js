import { Link } from "react-router-dom"

const HomeDetails = ({ resort }) => {
    return (
        <div className="home-details">
            <Link to={`/api/resorts/${resort._id}`}>
                <h4>{resort.name}</h4>
            </Link>
            <p><strong> Location: </strong>{resort.location}</p>
            <p>{resort.createdAt}</p>
        </div>
    )
}

export default HomeDetails