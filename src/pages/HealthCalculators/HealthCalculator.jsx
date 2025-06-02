import React from 'react';
import PageHeading from '@/components/PageHeading';
import HealthCalculatorButton from '@/components/health-calculators/HealthCalculatorButtons';
import { Link } from 'react-router-dom';

export default function HealthCalculator() {
  const description = `Lorem ipsum dolor sit amet consectetur. Arcu vitae eget nunc in cras eget. Aliquam diam 
    laoreet sed eget. Faucibus sed pretium risus viverra feugiat commodo nascetur. Eu quis 
    in mattis morbi velit habitant feugiat. Lorem ipsum dolor sit amet consectetur. Arcu vitae
    eget nunc in cras eget. Aliquam diam laoreet sed eget. Faucibus sed pretium risus viverra 
    feugiat commodo nascetur. Eu quis in mattis morbi velit habitant feugiat.`;

  const HealthCalculatorButtons = [
    { text: 'Body Mass Index (BMI) Calculator', className: '', linkTo: '' },
    { text: 'Calorie Calculator', className: '', linkTo: '' },
    { text: 'Calorie Calculator', className: '', linkTo: '' },
    { text: 'Ideal Body Weight (IBW) Calculator', className: '', linkTo: '' },
    { text: 'Body Fat Percentage Calculator', className: '', linkTo: '' },
    {
      text: 'Daily Caloric Needs (TDEE) Calculator',
      className: '',
      linkTo: '',
    },
    { text: 'Water Intake Calculator', className: '', linkTo: '' },
  ];

  return (
    <div id="health-calculator">
      <PageHeading text="Health Calculators"></PageHeading>
      <div
        id="health-calculators-content"
        className="w-[80%] flex justify-center flex-col items-center mr-auto ml-auto mt-16"
      >
        <div className="grid grid-cols-2 gap-y-3 gap-x-10 relative mb-10 w-full">
          {HealthCalculatorButtons.map((button, index) => (
            <HealthCalculatorButton
              key={index}
              text={button.text}
              linkTo={button.linkTo}
              className={button.className}
            ></HealthCalculatorButton>
          ))}
          <hr className="border-1 border-primary-yellow yellow w-[60%] absolute -right-55 bottom-0"></hr>
        </div>

        <h1 className="font-content font-semibold text-3xl text-primary-blue self-start">
          Description:{' '}
        </h1>
        <hr className="border-1 w-25 border-primary-yellow yellow self-start mt-1 mb-7"></hr>
        <p className="font-content ml-10 mb-10"> {description} </p>
      </div>
    </div>
  );
}
