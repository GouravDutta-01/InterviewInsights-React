import React, { useState } from 'react';
import axios from '../axios';
import useAuth from '../hooks/useAuth';

const ScheduleInterview = () => {
  useAuth();
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [date, setDate] = useState('');
  const [stages, setStages] = useState([{ stageName: '', description: '' }]);
  const [tags, setTags] = useState('');

  const handleStageChange = (index, event) => {
    const values = [...stages];
    values[index][event.target.name] = event.target.value;
    setStages(values);
  };

  const handleAddStage = () => {
    setStages([...stages, { stageName: '', description: '' }]);
  };

  const handleRemoveStage = (index) => {
    const values = [...stages];
    values.splice(index, 1);
    setStages(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('/posts', {
        company,
        role,
        date,
        stages,
        tags: tags.split(',').map(tag => tag.trim()),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Interview scheduled successfully');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Schedule Interview</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        />
        <div>
          {stages.map((stage, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                placeholder="Stage Name"
                name="stageName"
                value={stage.stageName}
                onChange={event => handleStageChange(index, event)}
                className="mb-2 p-2 border rounded w-full"
              />
              <input
                type="text"
                placeholder="Description"
                name="description"
                value={stage.description}
                onChange={event => handleStageChange(index, event)}
                className="mb-2 p-2 border rounded w-full"
              />
              <button type="button" onClick={() => handleRemoveStage(index)} className="bg-red-500 text-white p-2 rounded">Remove Stage</button>
            </div>
          ))}
          <button type="button" onClick={handleAddStage} className="bg-blue-500 text-white p-2 rounded">Add Stage</button>
        </div>
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Schedule</button>
      </form>
    </div>
  );
};

export default ScheduleInterview;
