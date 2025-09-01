import React, { useEffect, useState } from 'react';

const API_BASE = 'https://backend-assignment-4-1gut.onrender.com/api/profile';

function TopSkills() {
  const [topSkills, setTopSkills] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/top/skills`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch top skills');
        return res.json();
      })
      .then(data => setTopSkills(data))
      .catch(err => setError(err.message));
  }, []);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (topSkills.length === 0) return <p>Loading top skills...</p>;

  return (
    <div>
      <h2>Top Skills</h2>
      <ul>
        {topSkills.map(skill => (
          <li key={skill._id}>
            <b>{skill._id}</b> - {skill.count}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopSkills;
