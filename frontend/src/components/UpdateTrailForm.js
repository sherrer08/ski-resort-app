import { useState } from 'react';

const UpdateTrailForm = ({ trailId, currentStatus, onSuccess }) => {
    const [status, setStatus] = useState(currentStatus);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await fetch(`/api/trails/${trailId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ status }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to update trail status');
            } else {
                window.location.reload();
            }

            if(onSuccess) onSuccess(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='form-group'>
            <label>Update Trail Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value='Open'>Open</option>
                <option value='Closed'>Closed</option>
                <option value='Pending'>Pending</option>
            </select>

            {error && <p className='error'>{error}</p>}
            <button type='submit' disabled={loading}>
                {loading ? 'Updating...' : 'Update Status'}
            </button>
        </form>
    )
}

export default UpdateTrailForm;