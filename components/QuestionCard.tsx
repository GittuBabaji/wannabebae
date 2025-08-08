import { useMotionValue, useTransform, motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

interface QuestionCardProps {
  question: string;
  left: string;
  right: string;
  onSwipe: (dir: 'left' | 'right') => void;
  zIndex: number;
  onDragSide?: (side: 'left' | 'right' | null) => void;
  isMobile?: boolean;
}

export default function QuestionCard({
  question,
  left,
  right,
  onSwipe,
  zIndex,
  onDragSide,
  isMobile = false,  
}: QuestionCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [isMobile ? -10 : -15, 0, isMobile ? 10 : 15]);
  const controls = useAnimation();

  
  const swipeThreshold = isMobile ? 60 : 100;
  const dragActivationThreshold = isMobile ? 30 : 50;

  useEffect(() => {
    const unsubscribe = x.onChange((latest) => {
      if (!onDragSide) return;
      if (latest < -dragActivationThreshold) {
        onDragSide('left');
      } else if (latest > dragActivationThreshold) {
        onDragSide('right');
      } else {
        onDragSide(null);
      }
    });

    return () => unsubscribe();
  }, [x, onDragSide, dragActivationThreshold]);

  return (
    <motion.div
      className={`absolute bg-white text-black rounded-xl shadow-xl p-6 cursor-grab active:cursor-grabbing ${
        isMobile ? 'w-[280px] h-[380px]' : 'w-96 h-64'
      }`}
      style={{ x, rotate, zIndex }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={isMobile ? 0.4 : 0.5}
      onDragEnd={(_, info) => {
        if (info.offset.x < -swipeThreshold) {
          onSwipe('left');
        } else if (info.offset.x > swipeThreshold) {
          onSwipe('right');
        } else {
          controls.start({ x: 0, rotate: 0 });
        }
      }}
      whileTap={{ scale: isMobile ? 0.98 : 0.95 }}
    >
      <div className={`font-medium mb-4 ${isMobile ? 'text-lg' : 'text-xl'}`}>
        {question}
      </div>
      
      {isMobile && (
        <div className="text-sm text-gray-500 mt-2">
          Swipe left or right to choose
        </div>
      )}
    </motion.div>
  );
}
