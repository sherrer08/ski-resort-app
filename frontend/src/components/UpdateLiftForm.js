import { useState, useEffect } from 'react';

const UpdateLiftForm = ({ resortId, liftId, onSubmit }) => {
  const [lift, setLift] = useState(null);
  const [status, setStatus] = useState('Open');
  const [waitTime, setWaitTime] = useState(0);

  useEffect(() => {
    const fetchLift = async () => {
      const res = await fetch(`/api/resorts/${resortId}`);
      const data = await res.json();
      const targetLift = data.lifts.find(lift => lift._id === liftId);
      if (targetLift) {
        setLift(targetLift);
        setStatus(targetLift.status);
        setWaitTime(targetLift.waitTime);
      }
    };

    fetchLift();
  }, [resortId, liftId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({ status, waitTime: parseInt(waitTime) });
  };

  if (!lift) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="update-lift-form">
      <h2>Update Status: {lift.name}</h2>
      <label>Status:</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value='Open'>Open</option>
        <option value='Closed'>Closed</option>
        <option value='Maintenance'>Maintenance</option>
      </select>

      <label>Wait Time (min):</label>
      <input
        type='number'
        min='0'
        value={waitTime}
        onChange={(e) => setWaitTime(e.target.value)}
      />

      <button type="submit">Update Lift</button>
    </form>
  );
};

export default UpdateLiftForm;
