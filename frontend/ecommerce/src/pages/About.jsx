import React from 'react';
import Title from '../components/Title'
import NewsLetterBox from '../components/NewsLetterBox'
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt=''></img>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>At FOREVER, we believe fashion is more than what you wear — it’s how you express yourself. Founded with a passion for style and a promise of quality, we bring you handpicked collections that are effortlessly chic and endlessly wearable</p>
        <p>At FOREVER, we don’t just sell products — we curate experiences. Founded with the mission to make quality fashion and lifestyle essentials accessible to everyone, FOREVER is your one-stop destination for everything stylish, functional, and timeless</p>
      
        <b>Our Mission</b>
        <p>Our mission at FOREVER is to make shopping simple, inspiring, and rewarding — empowering you to choose products that reflect your unique personality and evolving lifestyle, whether you're dressing up, refreshing your space, or elevating your everyday.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col`x gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>At FOREVER, every product is hand-checked for quality, so you always get the best — no compromises.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col`x gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>FOREVER is designed for your ease — seamless shopping, secure payments, and doorstep delivery, all in one place.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col`x gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our support team at FOREVER is always ready to assist you — fast, friendly, and focused on your satisfaction.</p>
        </div>
      </div>

      <NewsLetterBox/>
      
    </div>
  );
}

export default About;
