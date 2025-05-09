import { useEffect, useState } from "react";

const AddTrailForm = ({ onSubmit, error }) => {
    const [resorts, setResorts] = useState([]);
    const [resortId, setResortId] = useState('');
    const [name, setName] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [status, setStatus] = useState('');

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
            onSubmit({ resort: resortId, name, difficulty, status });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
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

            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label>Difficulty</label>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} required>
                    <option value=''>-- Select a Difficulty --</option>
                    <option value='Beginner'>Beginner</option>
                    <option value='Intermediate'>Intermediate</option>
                    <option value='Advanced'>Advanced</option>
                    <option value='Expert'>Expert</option>
                </select>
            </div>

            <div className="form-group">
                <label>Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                    <option value=''>-- Select a Status --</option>
                    <option value='Open'>Open</option>
                    <option value='Closed'>Closed</option>
                    <option value='Pending'>Pending</option>
                </select>
            </div>

            {error && <p className="error">{error}</p>}

            <button type="submit">Add Trail</button>
        </form>
    );
};

export default AddTrailForm;