'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import QuestionCard from './QuestionCard';
import { questions } from '@/data/questions';
import ParticlesWrapper from './dot';

export default function CardSwipe() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{question: string, choice: string}[]>([]);
  const [hoverSide, setHoverSide] = useState<'left' | 'right' | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [displayedQuestions, setDisplayedQuestions] = useState(questions.slice(0, 3));

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    
    setDisplayedQuestions(questions.slice(currentIndex, currentIndex + 3));
  }, [currentIndex]);

  const handleSwipe = (direction: 'left' | 'right', question: string) => {
    const currentQuestion = questions[currentIndex];
    const choice = direction === 'left' ? currentQuestion.left : currentQuestion.right;

    const answer = {
      question: currentQuestion.question,
      choice: choice
    };

    setAnswers(prev => [...prev, answer]);
    console.log('Answered:', answer);
    console.log('All answers:', [...answers, answer]);

    setCurrentIndex(prev => prev + 1);
    setHoverSide(null);
  };

  useEffect(() => {
    if (currentIndex >= questions.length && answers.length > 0) {
      console.log('Quiz completed! Final answers:', answers);
    }
  }, [currentIndex, answers]);

  return (
    <div className="w-full h-screen flex items-center justify-center relative bg-black overflow-hidden">
      <ParticlesWrapper />

      {currentIndex < questions.length && (
        <>
          <div className={`absolute ${isMobile ? 'left-2 bottom-20' : 'left-4 top-1/2 -translate-y-1/2'} px-4 py-2 rounded-lg text-white border-2 
            transition-all duration-200 z-20 
            ${hoverSide === 'left' ? 'border-pink-500 bg-pink-700/20 shadow-pink-500 shadow-md' : 'border-white/20'}
            ${isMobile ? 'text-sm' : ''}`}>
            {questions[currentIndex]?.left}
          </div>

          <div className={`absolute ${isMobile ? 'right-2 bottom-20' : 'right-4 top-1/2 -translate-y-1/2'} px-4 py-2 rounded-lg text-white border-2 
            transition-all duration-200 z-20 
            ${hoverSide === 'right' ? 'border-green-500 bg-green-700/20 shadow-green-500 shadow-md' : 'border-white/20'}
            ${isMobile ? 'text-sm' : ''}`}>
            {questions[currentIndex]?.right}
          </div>
        </>
      )}

      <AnimatePresence>
        {displayedQuestions.map((q, i) => (
          <QuestionCard
            key={q.question}
            question={q.question}
            left={q.left}
            right={q.right}
            onSwipe={(dir) => handleSwipe(dir, q.question)}
            zIndex={10 - i}
            onDragSide={setHoverSide}
            isMobile={isMobile}
          />
        ))}
      </AnimatePresence>

      {currentIndex >= questions.length && (
        <div className="absolute text-center text-2xl font-semibold text-white z-20">
          All Done!
        </div>
      )}
    </div>
  );
}
