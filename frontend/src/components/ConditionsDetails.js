const ConditionsDetails = ({ report }) => {
    return (
        <div className="home-details">
            <h4>{report.resort.name}</h4>
            <p><strong>Created by: </strong>{report.user.username}</p>
            <p><strong>Description: </strong>{report.description}</p>
            <p><strong>Rating: </strong>{report.rating}</p>
        </div>
    )
}

export default ConditionsDetails;