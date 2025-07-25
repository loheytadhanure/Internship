import React from 'react';
import { assets } from '../assets/assets'; // ✅ You need this import!

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-grey-400'>
      {/* Hero Left */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141]'>
          <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-sm md:text-base'>OUR BESTSELLER</p>
          </div>
          <h1 className=' prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrival</h1>
          <div className='flex items-center gap-2'>
            <p className='font-semibold text-sm md:text-base'>Shop Now</p>
            <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p> {/* typo fixed md:3-11 → md:w-11 */}
          </div>
        </div>
      </div>

      {/* Hero Right */}
      <div className='w-full sm:w-1/2'>
        <img className='w-full' src={assets.hero_img} alt='' />
      </div>
    </div>
  );
}

export default Hero;
