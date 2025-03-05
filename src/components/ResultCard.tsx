
import React from 'react';
import { TrendingDown, TrendingUp, CheckCircle } from 'lucide-react';
import GlassCard from './GlassCard';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { calculatePercentChange } from '@/utils/calculations';

interface ResultCardProps {
  newShares: number | null;
  totalCost: number | null;
  newAverage: number | null;
  currentAverage: number | null;
  className?: string;
}

const ResultCard = ({ 
  newShares, 
  totalCost, 
  newAverage, 
  currentAverage,
  className 
}: ResultCardProps) => {
  const isReduced = newAverage !== null && currentAverage !== null && newAverage < currentAverage;

  const percentChange = currentAverage && newAverage 
    ? calculatePercentChange(currentAverage, newAverage)
    : 0;

  if (newShares === null || totalCost === null || newAverage === null) {
    return null;
  }

  return (
    <GlassCard 
      className={cn('overflow-hidden', className)} 
      animate
    >
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground/90">Result</h3>
          <motion.span 
            className="text-xs bg-primary/10 rounded-full px-3 py-1 text-primary font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5,
              delay: 0.3
            }}
          >
            <CheckCircle size={12} className="inline mr-1" />
            Calculation Complete
          </motion.span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div 
            className="space-y-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <p className="text-sm text-muted-foreground">Additional Shares to Buy</p>
            <motion.p 
              className="text-3xl font-bold text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {Math.ceil(newShares).toLocaleString()}
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="space-y-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <p className="text-sm text-muted-foreground">Investment Required</p>
            <motion.p 
              className="text-3xl font-bold text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              ₹{totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </motion.p>
          </motion.div>
        </div>

        <motion.div 
          className="mt-6 pt-6 border-t border-border/60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">New Average Cost</p>
              <motion.p 
                className="text-2xl font-bold text-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                ₹{newAverage.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </motion.p>
            </div>
            
            <motion.div 
              className={cn(
                "flex items-center px-3 py-1.5 rounded-lg",
                isReduced 
                  ? "bg-green-500/10 text-green-500 dark:bg-green-500/20 dark:text-green-400" 
                  : "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
              )}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20,
                delay: 0.6 
              }}
            >
              {isReduced ? (
                <TrendingDown size={16} className="mr-1" />
              ) : (
                <TrendingUp size={16} className="mr-1" />
              )}
              <span className="text-sm font-medium">
                {Math.abs(percentChange).toFixed(2)}%
              </span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </GlassCard>
  );
};

export default ResultCard;
