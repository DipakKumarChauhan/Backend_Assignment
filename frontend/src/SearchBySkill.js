import React, { useState } from 'react';

const API_BASE = 'http://localhost:8000/api/profile';

function SearchBySkill() {
  const [skill, setSkill] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!skill.trim()) {
      setError('Please enter a skill');
      return;
    }
    setError('');
    fetch(`${API_BASE}/search?q=${encodeURIComponent(skill)}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setResults(data);
          if (data.length === 0) setError('No profiles found for this skill');
        } else {
          setError('Unexpected response');
          setResults([]);
        }
      })
      .catch(() => setError('Failed to fetch data'));
  };

  return (
    <div>
      <h2>Search Projects by Skill</h2>
      <input
        type="text"
        value={skill}
        placeholder="Enter skill"
        onChange={e => setSkill(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {results.length > 0 && (
        <ul style={{ marginTop: 20 }}>
          {results.map(profile => (
            <li key={profile.email} style={{ marginBottom: 15 }}>
              <b>{profile.name}</b> — Skills: {profile.skills && profile.skills.join(', ')}
              {profile.projects && profile.projects.length > 0 && (
                <ul>
                  {profile.projects.map((proj, i) => (
                    <li key={i}>
                      <b>{proj.title}</b> - {proj.description}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBySkill;
