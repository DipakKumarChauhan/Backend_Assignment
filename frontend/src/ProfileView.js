import React, { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:8000/api/profile';

function ProfileView({ email }) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/${email}`)
      .then(res => {
        if (!res.ok) throw new Error('Profile not found');
        return res.json();
      })
      .then(data => setProfile(data))
      .catch(err => setError(err.message));
  }, [email]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>{profile.name}</h2>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Education:</strong> {profile.education && profile.education.join(', ')}</p>
      <p><strong>Skills:</strong> {profile.skills && profile.skills.join(', ')}</p>
      <h3>Projects</h3>
      {profile.projects && profile.projects.length > 0 ? (
        <ul>
          {profile.projects.map((proj, i) => (
            <li key={i}>
              <b>{proj.title}</b>: {proj.description}
              {proj.links && proj.links.length > 0 && (
                <div>
                  Links:{' '}
                  {proj.links.map((link, idx) => (
                    <a key={idx} href={link} target="_blank" rel="noreferrer" style={{ marginRight: 10 }}>
                      {link}
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
}

export default ProfileView;
