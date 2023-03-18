import React from 'react';

const Loading = ({ loadingText }) => {
  return (
    <div className='text-center py-4'>
      <p className='text-3xl'>{loadingText || 'Please wailt...'}</p>
    </div>
  );
};
export default Loading;
