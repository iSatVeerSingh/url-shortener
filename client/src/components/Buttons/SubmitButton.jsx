import React from 'react';
const SubmitButton = ({ btnText }) => {
  return (
    <button
      type='submit'
      className='px-6 py-2 bg-blue-500 text-white text-2xl rounded w-full mt-2 hover:bg-blue-300'
    >
      {btnText}
    </button>
  );
};
export default SubmitButton;
