import { Link } from "react-router-dom";

const ResortDetails = ({ resort }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="home-details">
            <h4>{resort.name}</h4>
            <p><strong>Location: </strong>{resort.location}</p>
            <Link to={`/api/trails/resort/${resort._id}`}>
                <p><strong>Trails: </strong></p>
            </Link>
            <h5>Lifts: </h5>
            {resort.lifts && resort.lifts.length > 0 ? (
                <ul>
                    {resort.lifts.map((lift) =>(
                        <li key={lift._id}>
                            {lift.name} - Status: {lift.status}, Wait Time: {lift.waitTime} min
                            {user?.isAdmin === true && (
                                <Link to={`/update-lift/${resort._id}/${lift._id}`}>
                                <   button className='favorite-button'>Update Lift Status</button>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No lifts available</p>
            )}
            <Link to={`/api/conditions/${resort._id}`}>
                <p><strong>Condition Reports: </strong></p>
            </Link>
        </div>
    )
}

export default ResortDetails