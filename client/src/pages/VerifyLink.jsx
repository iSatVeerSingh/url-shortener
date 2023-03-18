import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading/Loading';
import { sendClickVerification, verifyLink } from '../services/userApi';
import InputBox from '../components/Input/InputBox';
import SubmitButton from '../components/Buttons/SubmitButton';
import validateForm from '../utils/validateForm';

const VerifyLink = () => {
  const params = useParams();
  const { linkId } = params;

  const [isValidLink, setIsValidLink] = useState(false);
  const [validationMsg, setValidationMsg] = useState('');
  const [formErrors, setFormErrors] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      const { success, error, data } = await verifyLink(linkId);
      setLoading(false);
      if (success && !error) {
        setIsValidLink(true);
      } else {
        setValidationMsg(data);
      }
    };
    verify();
  }, []);

  const handleVerifyLink = async (e) => {
    e.preventDefault();
    const formValues = new FormData(e.target);

    const formdata = {
      name: formValues.get('name')?.toString().trim(),
      email: formValues.get('email')?.toString().trim(),
    };

    const isInvalid = validateForm(formdata, 'shortlink');

    if (isInvalid) {
      setFormErrors(isInvalid);
      return;
    }
    setFormErrors(null);
    setLoading(true);
    const { success, error, data } = await sendClickVerification(
      linkId,
      formdata,
    );
    setLoading(false);
    if (success && !error) {
      setIsValidLink(true);
      setValidationMsg(data);
    } else {
      setIsValidLink(false);
      setValidationMsg(data);
    }
  };

  if (loading) {
    return <Loading />;
  }
  if (isValidLink && validationMsg !== '') {
    return <h2>{validationMsg}</h2>;
  }

  return (
    <div className='grid place-items-center h-screen'>
      <div className='bg-emerald-100 p-4 rounded min-w-[400px]'>
        {!isValidLink && validationMsg !== '' ? (
          <h2>{validationMsg}</h2>
        ) : (
          <div>
            <h2>Please verify you email to open this link</h2>
            <form className='mt-3' onSubmit={handleVerifyLink}>
              <InputBox
                type='text'
                name='name'
                id='verifylink_name'
                label='Name'
                placeholder='Enter your name'
                inputError={formErrors?.name}
              />
              <InputBox
                type='text'
                name='email'
                id='verifylink_email'
                label='Email'
                placeholder='Enter your email'
                inputError={formErrors?.email}
              />
              <SubmitButton btnText='Submit' />
            </form>
          </div>
        )}
        <h1 className='text-4xl'></h1>
      </div>
    </div>
  );
};

export default VerifyLink;
