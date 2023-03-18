import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import SubmitButton from '../components/Buttons/SubmitButton';
import InputBox from '../components/Input/InputBox';
import Loading from '../components/Loading/Loading';
import { userLogin } from '../services/userApi';
import validateForm from '../utils/validateForm';

const Login = () => {
  const [formErrors, setFormErrors] = useState(null);
  const [isLogin, setIsLogin] = useState({
    loading: false,
    success: false,
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const formValues = new FormData(e.target);

    const formdata = {
      email: formValues.get('email')?.toString().trim(),
      password: formValues.get('password')?.toString().trim(),
    };

    const isInvalid = validateForm(formdata, 'login');

    if (isInvalid) {
      setFormErrors(isInvalid);
      return;
    }
    setFormErrors(null);
    setIsLogin({ loading: true });
    const { success, error, data } = await userLogin(formdata);
    if (success && !error) {
      setIsLogin({ loading: false, success: true });
    } else {
      setIsLogin({ loading: false });
      alert(data);
    }
  };

  if (isLogin.loading) {
    return <Loading />;
  }

  if (isLogin.success && !isLogin.loading) {
    return <Navigate to='/short' replace={true} />;
  }

  return (
    <div className='grid place-items-center h-screen'>
      <div className='bg-emerald-100 p-4 rounded min-w-[400px]'>
        <h1 className='text-4xl'>Welcome Back !</h1>
        <form className='mt-3' onSubmit={handleLogin}>
          <InputBox
            type='text'
            name='email'
            id='signup_email'
            label='Email'
            placeholder='Enter your email'
            inputError={formErrors?.email}
          />
          <InputBox
            type='password'
            name='password'
            id='signup_password'
            label='Password'
            placeholder='Enter your password'
            inputError={formErrors?.password}
          />
          <SubmitButton btnText='Login' />
        </form>
        <p className='mt-4'>
          <span>Don&#39;t have an account? </span>{' '}
          <Link className='text-red-400' to='/signup'>
            Signup Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
