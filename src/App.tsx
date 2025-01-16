import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import OrientationSurveyPage from './pages/OrientationSurveyPage';
import LandingPage from "@/pages/LandingPage.tsx";
import { OrientationSurveyProvider } from './context/OrientationSurveyContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App: React.FC = () => {
  return (
    // @TODO Wrap context providers only around routes that need to access the state in that specific context!
    <OrientationSurveyProvider>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/survey' element={<OrientationSurveyPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          {/* <Route path='/application-page' element={<ApplicationPage />} /> */}
        </Routes>
      </Router>
    </OrientationSurveyProvider>
  );
};

export default App;
