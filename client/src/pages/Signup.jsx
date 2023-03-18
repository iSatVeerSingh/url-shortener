import { Link } from 'react-router-dom';
import InputBox from '../components/Input/InputBox';
import SubmitButton from '../components/Buttons/SubmitButton';

const Signup = () => {
  return (
    <div className='grid place-items-center h-screen'>
      <div className='bg-emerald-100 p-4 rounded min-w-[400px]'>
        <h1 className='text-4xl'>Create New Account</h1>
        <form className='mt-3' /** onSubmit={handleSignup}*/>
          <InputBox
            type='text'
            name='name'
            id='signup_name'
            label='Name'
            placeholder='Enter your name'
            // inputError={formErrors?.name}
          />
          <InputBox
            type='text'
            name='email'
            id='signup_email'
            label='Email'
            placeholder='Enter your email'
            // inputError={formErrors?.email}
          />
          <InputBox
            type='password'
            name='password'
            id='signup_password'
            label='Password'
            placeholder='Enter your password'
            // inputError={formErrors?.password}
          />
          <SubmitButton btnText='Signup' />
        </form>
        <p className='mt-4'>
          <span>Already have an account </span>{' '}
          <Link className='text-red-400' to='/login'>
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
