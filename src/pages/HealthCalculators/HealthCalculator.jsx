import React from 'react';
import PageHeading from '@/components/PageHeading';
import CalculatorButton from '@/components/HealthCalculatorButtons';
import { Link } from 'react-router-dom';

export default function HealthCalculator() {
    const description = `Lorem ipsum dolor sit amet consectetur. Arcu vitae eget nunc in cras eget. Aliquam diam 
    laoreet sed eget. Faucibus sed pretium risus viverra feugiat commodo nascetur. Eu quis 
    in mattis morbi velit habitant feugiat. Lorem ipsum dolor sit amet consectetur. Arcu vitae
    eget nunc in cras eget. Aliquam diam laoreet sed eget. Faucibus sed pretium risus viverra 
    feugiat commodo nascetur. Eu quis in mattis morbi velit habitant feugiat.`;

    return (
        <div id = "HealthCalculator"> 
            <PageHeading text = "Health Calculators"></PageHeading>
            <div className = " flex-col columns-2 m-16 gap-x-16">
                <CalculatorButton text = "Body Mass Index (BMI) Calculator" > </CalculatorButton>
                <CalculatorButton text = "Calorie Calculator" > </CalculatorButton>
                <CalculatorButton text = "Basal Metabolic Rate (MBR) Calculator" > </CalculatorButton>
                <CalculatorButton text = "Ideal Body Weight (IBW) Calculator" > </CalculatorButton>
                <CalculatorButton text = "Body Fat Percentage Calculator" > </CalculatorButton>
                <CalculatorButton text = "Daily Caloric Needs (TDEE) Calculator" > </CalculatorButton>
                <CalculatorButton text = "Water Intake Calculator" > </CalculatorButton>
            </div>
            <hr className="border-1 border-primary-yellow yellow w-[43%] absolute right-0 mt-[-4rem]"></hr>

            <h1 className = "m-16 font-content text-4xl text-primary-blue"> Description </h1>
            <hr className="border-1 border-primary-yellow yellow absolute left-16 w-[7%] mt-[-3.8rem]"></hr>
            <p className='m-16 ml-30 font-content mt-[-2rem]'> {description} </p>
        </div>
    );
  }
