import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <Link to={'/auth/login'} className='btn btn-primary btn-block btn-lg shadow-lg mt-5'> AdminLogin </Link>
    </div>
  );
}

export default LandingPage;
