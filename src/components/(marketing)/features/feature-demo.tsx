'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

interface FeatureDemoProps {
  title: string;
  description: string;
  steps: {
    title: string;
    content: string;
    action: string;
  }[];
}

export function FeatureDemo({ title, description, steps }: FeatureDemoProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <div className="mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <h4 className="font-medium">{steps[currentStep].title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  {steps[currentStep].content}
                </p>
              </div>
              <Button onClick={nextStep} className="w-full">
                {steps[currentStep].action}
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
} 