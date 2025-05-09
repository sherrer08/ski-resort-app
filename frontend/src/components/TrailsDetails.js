import { useState } from "react";
import UpdateTrailForm from './UpdateTrailForm';

const TrailsDetails = ({ trail }) => {
    const [showForm, setShowForm] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    const toggleForm = () => {
        setShowForm(!showForm);
    }
    
    return (
        <div className="home-details">
            <h4>{trail.name}</h4>
            <p><strong>Difficulty: </strong>{trail.difficulty}</p>
            <p><strong>Status: </strong>{trail.status}</p>

            {user?.isAdmin && (
                <>
                    <button onClick={toggleForm}>
                        {showForm ? 'Cancel' : 'Update Trail Status'}
                    </button>

                    {showForm && (
                        <UpdateTrailForm 
                            trailId={trail._id}
                            currentStatus={trail.status}
                            onSuccess={(updatedTrail) => {
                                console.log('Trail updated:', updatedTrail);
                                setShowForm(false);
                            }}
                        />
                    )}
                </>
            )}
        </div>
    )
}

export default TrailsDetails