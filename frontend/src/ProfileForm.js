import React, { useState } from 'react';

const API_BASE = 'https://backend-assignment-4-1gut.onrender.com/api/profile';
const AUTH_TOKEN = '9f74b9a2ed7c4d29a679b0e4b1f5a394'; 

function ProfileForm() {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      education: '',
      skills: '',
      projects: '',
      work: '',
      links: ''
    });
  
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    // Helper: parse comma-separated strings into arrays
    const parseArray = (str) =>
      str.split(',').map(s => s.trim()).filter(s => s.length > 0);
  
    // Parse JSON strings safely
    const parseJSON = (str) => {
      try {
        const val = JSON.parse(str);
        return val;
      } catch (e) {
        return null;
      }
    };
  
    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setMessage('');
  
      if (!formData.email || !formData.name) {
        setError('Name and Email are required');
        return;
      }
  
      // Validate JSON fields
      if (formData.projects && !parseJSON(formData.projects)) {
        setError('Projects field contains invalid JSON');
        return;
      }
      if (formData.work && !parseJSON(formData.work)) {
        setError('Work field contains invalid JSON');
        return;
      }
      if (formData.links && !parseJSON(formData.links)) {
        setError('Links field contains invalid JSON');
        return;
      }
  
      const payload = {
        name: formData.name,
        email: formData.email,
        education: parseArray(formData.education),
        skills: parseArray(formData.skills),
        projects: parseJSON(formData.projects) || [],
        work: parseJSON(formData.work) || [],
        links: parseJSON(formData.links) || {}
      };
  
      setIsSubmitting(true);
      try {
        const res = await fetch(API_BASE, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${AUTH_TOKEN}`
          },
          body: JSON.stringify(payload)
        });
  
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || 'Failed to save profile');
        }
  
        setMessage('Profile saved successfully!');
        setFormData({
          name: '',
          email: '',
          education: '',
          skills: '',
          projects: '',
          work: '',
          links: ''
        });
      } catch (err) {
        setError(err.message);
      }
      setIsSubmitting(false);
    };
  
    return (
      <div>
        <h2>Add / Update Profile</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label">Name*:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-control"
              disabled={isSubmitting}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email*:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control"
              disabled={isSubmitting}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Education (comma separated):</label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="form-control"
              disabled={isSubmitting}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Skills (comma separated):</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="form-control"
              disabled={isSubmitting}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Projects (JSON format array):</label>
            <textarea
              name="projects"
              value={formData.projects}
              onChange={handleChange}
              rows={5}
              placeholder='e.g. [{"title":"Proj1","description":"Desc","links":["url"]}]'
              className="form-control"
              disabled={isSubmitting}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Work (JSON format array):</label>
            <textarea
              name="work"
              value={formData.work}
              onChange={handleChange}
              rows={5}
              placeholder='e.g. [{"company":"ABC","role":"Dev","startDate":"2023-01-01","endDate":"2023-06-01","description":"Desc"}]'
              className="form-control"
              disabled={isSubmitting}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Links (JSON object):</label>
            <textarea
              name="links"
              value={formData.links}
              onChange={handleChange}
              rows={3}
              placeholder='e.g. {"github":"url","linkedin":"url"}'
              className="form-control"
              disabled={isSubmitting}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
        {message && <div className="alert alert-success mt-3">{message}</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    );
  }
  
  export default ProfileForm;
