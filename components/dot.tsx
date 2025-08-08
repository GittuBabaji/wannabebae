'use client';
import dynamic from 'next/dynamic';

const Particles = dynamic(() => import('@/bits/Backgrounds/DotGrid/DotGrid'), {
  ssr: false,
  loading: () => <div />
});

const ParticlesWrapper = () => {
  return  <Particles
 dotSize={10}
    gap={15}
    baseColor="#fa05cd"
    activeColor="#ffffff"
    proximity={65}
    shockRadius={50}
    shockStrength={2}
    resistance={1750}
    returnDuration={0.5}
  />;
};

export default ParticlesWrapper;
