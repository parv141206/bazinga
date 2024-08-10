"use client";
import RainfallChart from '@/Components/Statefull/RainfallChart';
import { useTheme } from '@/Contexts/ThemeContext';
import { signIn, signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeroSection from '@/Components/Stateless/HeroSection';
import ShowcaseCrops from '@/Components/Stateless/ShowcaseCrops';
import Image from 'next/image';
import TitleCard from '@/Components/Statefull/TitleCard';

export default function Home() {

  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();



  return (
    <div className='bg-[var(--primary-dark)]'>
      <HeroSection />
      <div className="">
        <div className="container text-white flex flex-col gap-5 p-10 mx-auto">
          <div className="flex">
            <div className="flex w-1/2 flex-col justify-center">

              <div className="text-3xl text-bold ">This is how we help you grow...</div>
              <div className="text-xl">Just tell us what crops you grow,</div>
            </div>

            <div className="w-1/2 relative">
              <div className="absolute w-full h-full bg-gradient-to-r from-transparent to-[var(--primary-dark)]"></div>
              <ShowcaseCrops />
            </div>
          </div>
          <div className="flex  flex-row-reverse">
            <div className=" w-1/2 flex justify-center flex-col">
              <div className="text-3xl">
                We analyze the crop yeilds based on many factors such as,
              </div>
              <ul className="text-xl text-green-300 p-3">
                <li>Rainfall</li>
                <li>Soil Type</li>
                <li>Humidity</li>
                <li>Temprature</li>
                <li>...and many more</li>
              </ul>
            </div>
            <div className="w-1/2 flex items-center justify-center" >
              <Image className='object-cover rounded-3xl text-white' src={'/in.svg'} alt="india" width={300} height={300} />
            </div>
          </div>
          <div className="p-5 ">

            <div className="text-3xl text-center">Based on these factors</div>
            <div className="text-7xl text-center">We provide you <span className='text-green-300'>insights!</span></div>
            <div className="grid grid-cols-3 place-content-center  p-5 gap-5">
              <TitleCard title='When will it rain?' />
              <div className="text-3xl flex w-full text-center items-center justify-center">All questions answered!</div>
              <TitleCard title='What will the season bring this year?' />
              <TitleCard title='When would I sow my seads?' />
              <TitleCard title='Can rain lead to crop loss?' />

              <TitleCard title='When will the expected harvesting start?' />


            </div>
            <div className="relative">
              <div className="absolute right-0">

                <div id="leaves" className='absolute'>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                </div>
              </div>

              <div className="text-5xl text-center min-h-screen flex items-center  justify-center">
                And this is completely free
              </div>
              

            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
