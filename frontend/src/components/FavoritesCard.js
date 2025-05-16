const FavoritesCard = ({ resort, onRemove }) => {
    return (
        <div className="favorite-card">
            <h4>{resort.name}</h4>
            <p>{resort.location}</p>
            <button className="button" onClick={() => onRemove(resort._id)}>
                Remove Favorite
            </button>
        </div>
    );
};

export default FavoritesCard;