import LinkButton from '../components/Buttons/LinkButton';

const Home = () => {
  return (
    <div className='text-center py-12'>
      <h1 className='text-5xl mb-5'>Shorty</h1>
      <h2 className='text-4xl mb-2'>Simple and fast link shortening service</h2>
      <h2 className='text-3xl'>
        Track who clicks on your links and get notified
      </h2>
      <div className='flex gap-4 items-center justify-center mt-5 max-w-[400px] mx-auto'>
        <LinkButton to='/signup' btnText='SignUp' />
        <LinkButton to='/login' btnText='Login' />
      </div>
    </div>
  );
};

export default Home;
