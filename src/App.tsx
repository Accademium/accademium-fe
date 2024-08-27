import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrientationSurveyPage from './pages/OrientationSurveyPage';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/survey" element={<OrientationSurveyPage />} />
      </Routes>
    </Router>
  );
};

export default App;