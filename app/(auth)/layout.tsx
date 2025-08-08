import React from 'react';
import ParticlesWrapper from '@/components/ParticlesWrapper'; // adjust path accordingly

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 relative overflow-hidden ">
      <div className="absolute inset-0 z-0">
<ParticlesWrapper />
      </div>
       
      <div className="w-full max-w-md p-6 bg-black rounded-xl shadow-lg z-10">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
