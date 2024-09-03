import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import OrientationSurveyPage from './pages/OrientationSurveyPage';
import { OrientationSurveyProvider } from './context/OrientationSurveyContext';

const App: React.FC = () => {
  return (
    // @TODO Wrap context providers only around routes that need to access the state in that specific context!
    <OrientationSurveyProvider>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/survey' element={<OrientationSurveyPage />} />
          {/* <Route path='/application-page' element={<ApplicationPage />} /> */}
        </Routes>
      </Router>
    </OrientationSurveyProvider>
  );
};

export default App;
