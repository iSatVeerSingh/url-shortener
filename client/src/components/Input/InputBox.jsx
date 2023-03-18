import React from 'react';
const InputBox = ({ type, name, label, placeholder, id, inputError }) => {
  return (
    <div className='mt-3'>
      {label && (
        <label className='text-xl' htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className='w-full bg-transparent border outline-none border-black p-2'
        type={type}
        id={id}
        placeholder={placeholder}
        name={name}
      />
      {inputError && <p className='text-red-500'>{inputError}</p>}
    </div>
  );
};

export default InputBox;
