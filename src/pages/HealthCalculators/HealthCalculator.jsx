import React from 'react';
import PageHeading from '@/components/PageHeading';
import HealthCalculatorButton from '@/components/health-calculators/HealthCalculatorButtons';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

export default function HealthCalculator () {
  const description = `Lorem ipsum dolor sit amet consectetur. Arcu vitae eget nunc in cras eget. Aliquam diam 
    laoreet sed eget. Faucibus sed pretium risus viverra feugiat commodo nascetur. Eu quis 
    in mattis morbi velit habitant feugiat. Lorem ipsum dolor sit amet consectetur. Arcu vitae
    eget nunc in cras eget. Aliquam diam laoreet sed eget. Faucibus sed pretium risus viverra 
    feugiat commodo nascetur. Eu quis in mattis morbi velit habitant feugiat.`;

  const HealthCalculatorButtons = [
    {
      text: 'Body Mass Index (BMI) Calculator',
      linkTo: '/health-calculators/bmi',
    },
    {
      text: 'Basal Metabolic Rate Calculator',
      linkTo: '/health-calculators/bmr',
    },
    { text: 'Calorie & Daily Caloric Needs (TDEE) Calculator',
      className: '',
      linkTo: '/health-calculators/CalorieTDEECalculator' },
    { text: 'Calorie Calculator', className: '', linkTo: '' },
    { 
      text: 'Ideal Body Weight (IBW) Calculator',
      className: '',
      linkTo: '/health-calculators/ibw'
    },
    { text: 'Ideal Body Weight (IBW) Calculator', className: '', linkTo: '' },
    { text: 'Body Fat Percentage Calculator', className: '', linkTo: '' },
    {
      text: 'Daily Caloric Needs (TDEE) Calculator',
      linkTo: '/health-calculators/bmr',
    },
    { text: 'Water Intake Calculator', className: '', linkTo: '' },
  ];

  return (
    <div id='health-calculator' className='parent-container'>
      <PageHeading text='Fitness & Health Calculators' />
      <div id='health-calculators-content' className='content-container'>
        <div className='relative mb-10 w-full'>
          <div className='grid grid-cols-2 gap-y-3 gap-x-10'>
            {HealthCalculatorButtons.map((button, index) => (
              <HealthCalculatorButton 
                key={index}
                text={button.text}
                linkTo={button.linkTo}
              ></HealthCalculatorButton>
            ))}
          </div>
          <hr className='border-1 border-primary-yellow yellow absolute w-55 right-0 bottom-0'></hr>
        </div>
        <h1 className='font-content font-semibold text-xl lg:text-3xl text-primary-blue self-start'>
          Description:
        </h1>
        <hr className='border-1 w-25 border-primary-yellow yellow self-start mt-1 mb-7'></hr>
        <p className='font-content ml-10 mb-10 lg:text-base text-sm'>
          {' '}
          {description}{' '}
        </p>
      </div>
      <Footer></Footer>
    </div>
  );
}
