
import React, { useState, useEffect } from 'react';
import NumberInput from './NumberInput';
import ResultCard from './ResultCard';
import GlassCard from './GlassCard';
import { calculateNewShares, calculateNewAverage, calculateTotalCost, calculatePercentChange } from '@/utils/calculations';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calculator, RefreshCcw } from 'lucide-react';

interface FormValues {
  currentInvestment: number | '';
  currentShares: number | '';
  marketPrice: number | '';
  targetAverage: number | '';
}

interface FormErrors {
  currentInvestment?: string;
  currentShares?: string;
  marketPrice?: string;
  targetAverage?: string;
  general?: string;
}

const StockCalculator = () => {
  const [values, setValues] = useState<FormValues>({
    currentInvestment: '',
    currentShares: '',
    marketPrice: '',
    targetAverage: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [newShares, setNewShares] = useState<number | null>(null);
  const [totalCost, setTotalCost] = useState<number | null>(null);
  const [oldAverage, setOldAverage] = useState<number | null>(null);
  const [newAverage, setNewAverage] = useState<number | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);

  const handleInputChange = (name: keyof FormValues, value: number | '') => {
    setValues(prev => ({ ...prev, [name]: value }));

    // Clear error for this field when user is typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Clear calculation results when inputs change
    if (isCalculated) {
      setIsCalculated(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate current investment
    if (values.currentInvestment === '') {
      newErrors.currentInvestment = 'Please enter your current investment.';
    } else if (values.currentInvestment <= 0) {
      newErrors.currentInvestment = 'Current investment must be greater than 0.';
    }

    // Validate current shares
    if (values.currentShares === '') {
      newErrors.currentShares = 'Please enter the number of shares you currently own.';
    } else if (values.currentShares <= 0) {
      newErrors.currentShares = 'Number of shares must be greater than 0.';
    }

    // Validate market price
    if (values.marketPrice === '') {
      newErrors.marketPrice = 'Please enter the current market price.';
    } else if (values.marketPrice <= 0) {
      newErrors.marketPrice = 'Market price must be greater than 0.';
    }

    // Validate target average
    if (values.targetAverage === '') {
      newErrors.targetAverage = 'Please enter your target average price.';
    } else if (values.targetAverage <= 0) {
      newErrors.targetAverage = 'Target average must be greater than 0.';
    }

    // Additional business logic validations
    if (
      typeof values.marketPrice === 'number' &&
      typeof values.targetAverage === 'number' &&
      values.marketPrice >= values.targetAverage
    ) {
      newErrors.targetAverage = 'Target average price must be greater than the market price.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validateForm()) {
      return;
    }

    // All values are validated and present at this point
    const newShares = calculateNewShares(
      values.currentInvestment as number,
      values.currentShares as number,
      values.marketPrice as number,
      values.targetAverage as number
    );

    if (newShares === null) {
      setErrors({
        general: 'Unable to reach target average with current market price. The market price must be lower than the target average price.'
      });
      return;
    }

    const cost = calculateTotalCost(newShares, values.marketPrice as number);

    const oldAvg = (values.currentInvestment as number) / (values.currentShares as number);

    const avg = calculateNewAverage(
      values.currentInvestment as number,
      values.currentShares as number,
      newShares,
      values.marketPrice as number
    );

    setNewShares(newShares);
    setTotalCost(cost);
    setOldAverage(oldAvg);
    setNewAverage(avg);
    setIsCalculated(true);
  };

  const handleReset = () => {
    setValues({
      currentInvestment: '',
      currentShares: '',
      marketPrice: '',
      targetAverage: '',
    });
    setErrors({});
    setNewShares(null);
    setTotalCost(null);
    setNewAverage(null);
    setIsCalculated(false);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <GlassCard className="lg:col-span-3 animate-fade-in">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Calculator className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Stock Averaging Calculator</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <NumberInput
                id="currentInvestment"
                label="Current Investment"
                value={values.currentInvestment}
                onChange={(value) => handleInputChange('currentInvestment', value)}
                placeholder="10000.00"
                prefix="₹"
                tooltip="Your current investment"
                min={0}
                step={0.01}
                required
                error={errors.currentInvestment}
              />

              <NumberInput
                id="currentShares"
                label="Current Shares"
                value={values.currentShares}
                onChange={(value) => handleInputChange('currentShares', value)}
                placeholder="10"
                tooltip="The number of shares you currently own"
                min={0}
                step={1}
                required
                error={errors.currentShares}
              />

              <NumberInput
                id="marketPrice"
                label="Current Market Price"
                value={values.marketPrice}
                onChange={(value) => handleInputChange('marketPrice', value)}
                placeholder="800.00"
                prefix="₹"
                tooltip="The current market price per share"
                min={0}
                step={0.01}
                required
                error={errors.marketPrice}
              />

              <NumberInput
                id="targetAverage"
                label="Target Average Price"
                value={values.targetAverage}
                onChange={(value) => handleInputChange('targetAverage', value)}
                placeholder="850.00"
                prefix="₹"
                tooltip="Your desired average price per share"
                min={0}
                step={0.01}
                required
                error={errors.targetAverage}
              />
            </div>

            {errors.general && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg animate-fade-in">
                {errors.general}
              </div>
            )}

            <div className="flex items-center space-x-3 pt-2">
              <Button
                onClick={handleCalculate}
                className="transition-all duration-300 bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={
                  values.currentInvestment === '' ||
                  values.currentShares === '' ||
                  values.marketPrice === '' ||
                  values.targetAverage === ''
                }
              >
                Calculate
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                onClick={handleReset}
                className="border-primary/20 text-primary hover:bg-primary/5"
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
        </GlassCard>

        <div className="lg:col-span-2">
          {isCalculated ? (
            <ResultCard
              newShares={newShares}
              totalCost={totalCost}
              newAverage={newAverage}
              currentAverage={oldAverage}
              className="h-full"
            />
          ) : (
            <GlassCard className="h-full flex items-center justify-center text-center p-8 animate-fade-in">
              <div>
                <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-4">
                  <Calculator className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Ready to Optimize Your Portfolio</h3>
                <p className="text-muted-foreground text-sm">
                  Enter your current holdings and target average to see how many additional
                  shares you need to buy to reach your investment goals.
                </p>
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockCalculator;
