import React, { useState } from 'react';
import InputBox from '../components/Input/InputBox';
import SubmitButton from '../components/Buttons/SubmitButton';
import { shortUrl } from '../services/userApi';
import Loading from '../components/Loading/Loading';

const ShortUrl = () => {
  const [formError, setFormError] = useState(null);
  const [isShort, setIsShort] = useState({
    loading: false,
    shortUrl: false,
  });

  const handleShortURl = async (e) => {
    e.preventDefault();
    const formValue = new FormData(e.target);
    const formdata = {
      originalUrl: formValue.get('originalUrl').toString().trim() || '',
    };

    setIsShort({ loading: true });
    const { success, error, data } = await shortUrl(formdata);
    if (success && !error) {
      setIsShort({ loading: false, shortUrl: data.shortUrl });
    } else {
      setIsShort({ loading: false });
      setFormError(data);
    }
    setFormError(null);
  };
  if (isShort.loading) {
    return <Loading />;
  }

  return (
    <div className='h-screen flex items-center flex-col'>
      <div className='py-10 min-w-[500px]'>
        <form onSubmit={handleShortURl}>
          <InputBox
            type='text'
            name='originalUrl'
            id='originalUrl'
            placeholder='enter long url here'
            inputError={formError}
          />
          <SubmitButton btnText='Create Short Url' />
        </form>
      </div>
      {isShort.shortUrl && (
        <div>
          <p>{isShort.shortUrl}</p>
        </div>
      )}
    </div>
  );
};
export default ShortUrl;
