"use client";
import RainfallChart from '@/Components/Statefull/RainfallChart';
import { useTheme } from '@/Contexts/ThemeContext';
import { signIn, signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeroSection from '@/Components/Stateless/HeroSection';

export default function Home() {

  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();



  return (
    <div>
      <HeroSection />
      
    </div>
  );
}
