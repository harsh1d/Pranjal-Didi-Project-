import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StaffScheduling() {
  const [staff, setStaff] = useState([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [shifts, setShifts] = useState([{ start: '', end: '' }]);

  useEffect(() => {
    axios.get('http://localhost:5000/staff')
      .then(response => setStaff(response.data))
      .catch(error => console.error('Error fetching staff:', error));
  }, []);

  const handleAddShift = () => {
    setShifts([...shifts, { start: '', end: '' }]);
  };

  const handleRemoveShift = (index) => {
    const newShifts = shifts.filter((_, i) => i !== index);
    setShifts(newShifts);
  };

  const handleShiftChange = (index, event) => {
    const newShifts = [...shifts];
    newShifts[index][event.target.name] = event.target.value;
    setShifts(newShifts);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/staff', { name, role, shifts })
      .then(response => setStaff([...staff, response.data]))
      .catch(error => console.error('Error adding staff:', error));
  };

  return (
    <div>
      <h2>Staff Scheduling</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role"
          required
        />
        {shifts.map((shift, index) => (
          <div key={index}>
            <input
              type="datetime-local"
              name="start"
              value={shift.start}
              onChange={(e) => handleShiftChange(index, e)}
              required
            />
            <input
              type="datetime-local"
              name="end"
              value={shift.end}
              onChange={(e) => handleShiftChange(index, e)}
              required
            />
            <button type="button" onClick={() => handleRemoveShift(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddShift}>Add Shift</button>
        <button type="submit">Submit</button>
      </form>
      <ul>
        {staff.map(member => (
          <li key={member._id}>
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            <ul>
              {member.shifts.map((shift, index) => (
                <li key={index}>
                  {new Date(shift.start).toLocaleString()} - {new Date(shift.end).toLocaleString()}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StaffScheduling;
