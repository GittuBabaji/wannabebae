'use client'

import Link from 'next/link'
import FuzzyText from '@/bits/TextAnimations/FuzzyText/FuzzyText'

export default function NotFoundContent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 space-y-6">
      <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover>
        404
      </FuzzyText>

      <p className="text-gray-500 max-w-md">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        href="/dashboard"
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        Return to Home
      </Link>
    </div>
  )
}
