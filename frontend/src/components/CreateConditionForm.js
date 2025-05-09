import { useState, useEffect } from 'react';

const CreateConditionForm = ({ onSubmit, error }) => {
    const [resorts, setResorts] = useState([]);
    const [resortId, setResortId] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(1);

    useEffect(() => {
        const fetchResorts = async () => {
            const res = await fetch('/api/resorts/');
            const data = await res.json();
            setResorts(data);
        };
        fetchResorts();
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit({ resort: resortId, description, rating });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label>Resort</label>
                <select
                    value={resortId}
                    onChange={(e) => setResortId(e.target.value)}
                    required
                >
                    <option value=''>-- Select a Resort --</option>
                    {resorts.map((resort) => (
                        <option key={resort._id} value={resort._id}>
                            {resort.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className='form-group'>
                <label>Description</label>
                <textarea
                    rows='4'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>

            <div className='form-group'>
                <label>Rating (1-5)</label>
                <input
                    type='number'
                    min='1'
                    max='5'
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    required
                />
            </div>

            {error && <p className='error'>{error}</p>}
            
            <button type='submit'>Submit Report</button>
        </form>   
    );
};

export default CreateConditionForm;