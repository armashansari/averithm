
import React from 'react';
import { TrendingUp } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <header className="w-full py-6 animate-fade-in">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        <motion.div 
          className="flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 mb-3"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2
            }}
          >
            <TrendingUp className="h-6 w-6 text-primary" />
          </motion.div>
          <motion.h1 
            className="text-3xl md:text-4xl font-bold tracking-tight mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Averithm
          </motion.h1>
          <motion.p 
            className="text-muted-foreground max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Optimize your investment strategy by calculating exactly how many additional 
            shares to buy to achieve your target average price.
          </motion.p>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
