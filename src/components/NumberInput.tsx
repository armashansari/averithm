
import React, { ChangeEvent } from 'react';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface NumberInputProps {
  id: string;
  label: string;
  value: number | '';
  onChange: (value: number | '') => void;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  tooltip?: string;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  error?: string;
}

const NumberInput = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  prefix,
  suffix,
  tooltip,
  min,
  max,
  step = 1,
  required = false,
  className,
  labelClassName,
  error
}: NumberInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      onChange('');
    } else {
      const numVal = parseFloat(val);
      onChange(numVal);
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center space-x-2">
        <label 
          htmlFor={id} 
          className={cn(
            'text-sm font-medium text-foreground/90 transition-opacity',
            labelClassName
          )}
        >
          {label}{required && <span className="text-destructive ml-1">*</span>}
        </label>
        
        {tooltip && (
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger type="button" className="group">
                <Info size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                className="bg-background/95 frosted-blur text-foreground text-xs max-w-[220px] relative shadow-lg" 
                sideOffset={5}
              >
                {tooltip}
                <div className="tooltip-arrow"></div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      
      <div className="relative">
        {prefix && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-muted-foreground">{prefix}</span>
          </div>
        )}
        
        <input
          type="number"
          id={id}
          value={value === '' ? '' : value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          className={cn(
            "w-full border rounded-lg bg-background/50 py-2 px-3 text-foreground placeholder:text-muted-foreground input-ring transition-all duration-200",
            prefix && "pl-8",
            suffix && "pr-8",
            error ? "border-destructive/50" : "border-input hover:border-primary/30",
          )}
        />
        
        {suffix && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-muted-foreground">{suffix}</span>
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-destructive text-xs animate-fade-in">{error}</p>
      )}
    </div>
  );
};

export default NumberInput;
