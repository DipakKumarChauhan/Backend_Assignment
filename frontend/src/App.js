import React from 'react';
import ProfileView from './ProfileView';
import SearchBySkill from './SearchBySkill';
import ProfileForm from './ProfileForm';
import TopSkills from './TopSkills';

function App() {
  const email = 'ece22133@iiitkalyani.ac.in';

  return (
    <div className="container my-4">
      <h1 className="mb-4">My Candidate Profile</h1>

      <div className="mb-5">
        <ProfileView email={email} />
      </div>

      <div className="mb-5">
        <SearchBySkill />
      </div>

      <div className="mb-5">
        <TopSkills />
      </div>

      <div className="mb-5">
        <ProfileForm />
      </div>

      <footer className="text-center mt-5 mb-3">
        <small>© 2025 Dipak Kumar Chauhan - Backend Assignment</small>
      </footer>
    </div>
  );
}

export default App;
