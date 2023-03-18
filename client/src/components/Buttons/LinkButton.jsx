import React from 'react';
import { Link } from 'react-router-dom';
const LinkButton = ({ to, btnText }) => {
  return (
    <Link className='bg-blue-500 px-6 py-2 text-2xl text-white rounded' to={to}>
      {btnText}
    </Link>
  );
};

export default LinkButton;
