
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'dark';
  animate?: boolean;
}

const GlassCard = ({ 
  children, 
  className, 
  variant = 'default',
  animate = false 
}: GlassCardProps) => {
  const cardContent = (
    <div
      className={cn(
        'rounded-2xl p-6 transition-all duration-300',
        variant === 'default' ? 'glass' : 'glass-dark',
        className
      )}
    >
      {children}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5,
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

export default GlassCard;
