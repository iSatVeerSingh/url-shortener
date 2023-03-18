import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Loading from '../components/Loading/Loading';
import { getVerify } from '../services/userApi';

const SignupVerify = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const [isVerify, setIsVerify] = useState({
    loading: true,
    message: '',
  });

  useEffect(() => {
    if (!token) {
      setIsVerify({ loading: false, message: 'Invalid Link' });
      return;
    }
    const verify = async () => {
      const { data } = await getVerify(token);
      setIsVerify({ loading: false, message: data });
    };
    verify();
  }, []);

  if (isVerify.loading) {
    return <Loading />;
  }

  return (
    <div className='text-center py-12'>
      <p className='text-2xl'>{isVerify.message}</p>
      <div className='mt-5'>
        <Link className='text-2xl underline' to='/login'>
          Login Here
        </Link>
      </div>
    </div>
  );
};

export default SignupVerify;
