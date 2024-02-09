import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PersonalPage from './PersonalPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PersonalPage />} />
      </Routes>
    </Router>
  );
};

export default App;