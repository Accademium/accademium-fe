import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Welcome to Accademium</h1>
      <Link to="/survey">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Start Survey
        </button>
      </Link>
    </div>
  );
};

export default HomePage;
