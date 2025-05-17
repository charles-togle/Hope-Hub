import React from 'react';
import PageHeading from '@/components/PageHeading';
import HealthCalculatorButton from '@/components/health-calculators/HealthCalculatorButtons';
import { Link } from 'react-router-dom';

export default function HealthCalculatorLayout() {
  return (
    <div id="health-calculator-layout">
      <PageHeading text="Test"></PageHeading>
      <div
        id="health-calculators-content"
        className="w-[80%] flex justify-center flex-col items-center mr-auto ml-auto mt-16"
      >
        <p className = "text-9xl"> BURAT </p>
      </div>
    </div>
  );
}
