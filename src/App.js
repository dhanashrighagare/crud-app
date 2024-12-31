import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Import BrowserRouter here
import { fetchMembers } from './api';  // Make sure to fetch members when the component mounts
import MemberList from './components/MemberList';
import EditMember from './components/EditMember';
import CreateMember from './components/CreateMember';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembersList = async () => {
      const membersData = await fetchMembers();
      setMembers(membersData);
    };
    fetchMembersList();
  }, []);

  return (
    <Router>  {/* Wrap the entire app with BrowserRouter */}
      <div>
        <Routes>  {/* Define the routing structure */}
          <Route
            path="/"
            element={<MemberList members={members} setMembers={setMembers} />}
          />
          <Route
            path="/edit/:id"
            element={<EditMember setMembers={setMembers} />}
          />
          <Route
            path="/create"
            element={<CreateMember setMembers={setMembers} />}
          />
        </Routes>
        <ToastContainer />
      </div>
    </Router>  
  );
};

export default App;
