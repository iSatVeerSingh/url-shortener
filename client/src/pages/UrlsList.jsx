import React, { useEffect, useState } from 'react';
import { getAllUrls } from '../services/userApi';

const UrlsList = () => {
  const [urls, setUrls] = useState([]);
  const [resError, setResError] = useState(null);

  useEffect(() => {
    const getUrls = async () => {
      const { success, error, data } = await getAllUrls();
      if (success && !error) {
        setUrls(data);
      } else {
        setResError(data);
      }
    };
    getUrls();
  }, []);

  if (resError) {
    return <h1>{resError}</h1>;
  }

  return (
    <div className='py-10'>
      <h2 className='text-3xl text-center mb-3'>All Short Links</h2>
      <div>
        {urls.length === 0 ? (
          <p>No Short Links here</p>
        ) : (
          urls.map((url) => (
            <div className='grid grid-cols-[300px_auto] border' key={url._id}>
              <p className='border-r px-4 py-3'>
                {'http://localhost:5000/' + url.shortUrl}
              </p>
              <p className='px-4 py-3'>{url.originalUrl}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default UrlsList;
