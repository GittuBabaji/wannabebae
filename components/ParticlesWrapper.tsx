'use client';
import dynamic from 'next/dynamic';

const Particles = dynamic(() => import('@/bits/Backgrounds/FaultyTerminal/FaultyTerminal'), {
  ssr: false,
  loading: () => <div />
});

const ParticlesWrapper = () => {
  return  <Particles
    scale={1.5}
    gridMul={[2, 1]}
    digitSize={1.2}
    timeScale={1}
    pause={false}
    scanlineIntensity={1}
    glitchAmount={1}
    flickerAmount={1}
    noiseAmp={1}
    chromaticAberration={0}
    dither={0}
    curvature={0}
    tint="#fc03e3"
    mouseReact={true}
    mouseStrength={0.5}
    pageLoadAnimation={false}
    brightness={1}
  />;
};

export default ParticlesWrapper;
