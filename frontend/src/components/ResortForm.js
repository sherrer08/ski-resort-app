import { useState } from "react";

const ResortForm = ({ onSubmit, defaultValues = {} }) => {
    const [name, setName] = useState(defaultValues.name || '');
    const [location, setLocation] = useState(defaultValues.location || '');
    const [lifts, setLifts] = useState(defaultValues.lifts ||[{ name: '', status: 'Open', waitTime: 0 }]);
    const [longitude, setLongitude] = useState(defaultValues.longitude || '');
    const [latitude, setLatitude] = useState(defaultValues.latitude || '');
    const [error, setError] = useState(null);

    const handleLiftChange = (index, field, value) => {
        const updated = [...lifts];
        updated[index][field] = value;
        setLifts(updated);
    };

    const addLiftField = () => {
        setLifts([...lifts, { name: '', status: 'Open', waitTime: 0}]);
    };

    const removeLiftField = (index) => {
        setLifts(lifts.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const newResort = {
            name,
            location,
            trails: [],
            lifts,
            coordinates: {
                type: 'Point',
                coordinates: [parseFloat(longitude), parseFloat(latitude)],
            },
            reports: [],
        };

        onSubmit(newResort, setError);
    };

    return (
        <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Resort Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div className='form-group'>
                    <label>Location</label>
                    <input value={location} onChange={(e) => setLocation(e.target.value)} required />
                </div>

                <div className='form-group'>
                    <label>Coordinates (Latitude & Longitude)</label>
                    <input
                        type='number'
                        step='any'
                        placeholder='Longitude'
                        value={longitude} 
                        onChange={(e) => setLongitude(e.target.value)} 
                        required 
                    />
                    <input
                        type='number'
                        step='any'
                        placeholder='Latitude'
                        value={latitude} 
                        onChange={(e) => setLatitude(e.target.value)} 
                        required 
                    />
                </div>

                <div className='form-group'>
                    <label>Lifts</label>
                    {lifts.map((lift, index) => (
                        <div key={index} style={{ marginBottom: '10px' }}>
                            <input
                                placeholder='Lift Name'
                                value={lift.name}
                                onChange={(e) => handleLiftChange(index, 'name', e.target.value)}
                                required
                            />
                            <select
                                value={lift.status}
                                onChange={(e) => handleLiftChange(index, 'status', e.target.value)}
                            >
                                <option value='Open'>Open</option>
                                <option value='Closed'>Closed</option>
                                <option value='Maintenence'>Maintenence</option>
                            </select>
                            <input
                                type='number'
                                placeholder='Wait Time (min)'
                                value={lift.waitTime}
                                onChange={(e) => handleLiftChange(index, 'waitTime', parseInt(e.target.value))}
                                required
                            />
                            {lifts.length > 1 && (
                                <button type='button' onClick={() => removeLiftField(index)}>
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                    <button type='button' onClick={addLiftField}>
                        Add Lift
                    </button>
                </div>

                {error && <p className='error'>{error}</p>}
                <button type='submit'>Add Resort</button>
            </form>
    );
};

export default ResortForm;