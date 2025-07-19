import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
      <Title text1={'CONTACT'} text2={'US'}/>
      </div>
      <div className='flex flex-col sm:flex-row justify-center gap-10 mb-28 my-10'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt=''></img>
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className=' text-gray-600'>30116 Street <br/> Lane 9, Bombay, Maharashtra, India </p>
          <p className=' text-gray-600'>tel: +91 98765 43210 <br/> Email: loheytadhanure@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Forever</p>
          <p className=' text-gray-600'>Learn more about out teams and job openings</p>
          <button className=' border border-black text-sm px-8 py-4 hover:text-white hover:bg-black transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>

      <NewsLetterBox/>

    </div>
    
  );
}

export default Contact;
