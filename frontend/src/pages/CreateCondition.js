import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateConditionForm from '../components/CreateConditionForm';

const CreateReport = () => {
    const [error, setError] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const handleFormSubmit = async ({ resort, description, rating }) => {
        setError(null);

        try {
            const res = await fetch('/api/conditions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    resort,
                    user: user._id,
                    description,
                    rating
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Something went wrong');
            } else {
                navigate('/');
            };
        } catch (err) {
            setError('Failed to submit report')
        }
    };

    return (
        <div className='login-container'>
            <h2>Create Condition Report</h2>
            <CreateConditionForm onSubmit={handleFormSubmit} error={error} user={user} />
        </div>
    );
};

export default CreateReport;