import React from 'react';

const NewsLetterBox = () => {

    const onSubmitHandler = () => {
        event.preventDefault();

    }


  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now and get 20% off</p>
        <p className='text-gray-300 mt-3'>
            Subscribe to our newsletter for exclusive deals, style tips, new arrivals, and more — straight to your inbox. No spam, we promise!
        </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex item-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1 outline-none' type='email' placeholder='type your email 'required/>
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>Subscribe</button>
        </form>
      
    </div>
  );
}

export default NewsLetterBox;
