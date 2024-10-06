import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HomePage: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold mb-8'>
        Welcome to Accademium Orientation Survey
      </h1>
      <Link to='/survey'>
        <Button>Start Survey</Button>
      </Link>
    </div>
  );
};

export default HomePage;
