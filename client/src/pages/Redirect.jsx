import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Loading from '../components/Loading/Loading';
import { linkClickRedirect } from '../services/userApi';

const Redirect = () => {
  const params = useParams();
  const { linkId } = params;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const [loading, setLoading] = useState(true);
  const [validation, setValidation] = useState('');

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setValidation('Invalid Link');
      return;
    }
    const verifyClick = async () => {
      const { success, error, data } = await linkClickRedirect(linkId, token);
      if (success && !error) {
        window.location = data;
      } else {
        setLoading(false);
        setValidation(data);
      }
    };
    verifyClick();
  }, []);

  if (loading) {
    return (
      <Loading loadingText='Please wait while you are being redirect to target link...' />
    );
  }

  return (
    <div className='text-center py-12'>
      {validation !== '' && <p className='text-2xl'>{validation}</p>}
    </div>
  );
};

export default Redirect;
