import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddTrailForm from "../components/AddTrailForm";

const AddTrail = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleFormSubmit = async ({ resort, name, difficulty, status }) => {
        setError(null);

        try {
            console.log({
                resort,
                user: user._id,
                name,
                difficulty,
                status
              });
              
            const res = await fetch('/api/trails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    resort,
                    user: user._id,
                    name,
                    difficulty,
                    status
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Something went wrong');
            } else {
                navigate('/');
            };
        } catch (error) {
            setError('Failed to add trail.')
        }
    }

    return (
        <div className="login-container">
            <h2>Add Trail</h2>
            <AddTrailForm onSubmit={handleFormSubmit} error={error} user={user}/>
        </div>
    )
}

export default AddTrail;