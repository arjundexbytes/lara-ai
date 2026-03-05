import React from 'react';
import LandingPageHero from '@/src/components/landing/LandingPageHero';

export default function Landing() {
  return <LandingPageHero onCta={() => { window.location.href = '/dashboard'; }} />;
}
