import React from 'react';
import PageHeading from '@/components/PageHeading';
// import HealthCalculatorButton from '@/components/health-calculators/HealthCalculatorButtons';
// import { Link } from 'react-router-dom';
// import HealthCalculatorLayout from "@/components/health-calculators/HealthCalculatorsLayout";

export default function BMR() {
    return (
    <div id="BMI">
        <PageHeading text="Test"></PageHeading>
        <div
        id="BMI-content"
        className="w-[80%] flex justify-center flex-col items-center mr-auto ml-auto mt-16"
        >
            <p className = "text-9xl"> B </p>
        </div>
    </div>
    );
}