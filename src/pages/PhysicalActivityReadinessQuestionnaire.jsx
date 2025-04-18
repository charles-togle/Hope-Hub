import PageHeading from '@/components/PageHeading';
import { usePhysicalFitnessData } from '@/hooks/usePhysicalFitnessData';
import { useState } from 'react';

export default function PhysicalActivityReadinessQuestionnaire() {
  const { physicalFitnessData, setPhysicalFitnessData } =
    usePhysicalFitnessData();
  const [areAllAnswersYes, setAreAllAnswersYes] = useState(false);

  const questions = [
    'Has your doctor ever said that you have a heart condition and that you should only do physical activity recommended by a doctor?',
    'Do you feel pain in your chest when you do physical activity?',
    'In the past month, have you had chest pain when you were not doing physical activity?',
    'Do you have a bone or joint problem that could be made worse by a change in your physical activity?',
    'Is your doctor currently prescribing drugs (for example, water pills) for your blood pressure or heart condition?',
    'Do you know of any other reason why you should not do physical activity? if yes ? please include reason.',
  ];

  const handleInformationChange = (keyName, value) => {
    setPhysicalFitnessData((prev) => ({
      ...prev,
      [keyName]: value,
    }));
    console.log(physicalFitnessData);
  };
  return (
    <div
      id="physical-fitness-test-parq"
      className="w-full min-h-screen max-h-fit"
    >
      <PageHeading text="Physical Fitness Test"></PageHeading>
      <div
        id="physical-fitness-test-parq-container"
        className="w-[80%] mr-auto  ml-auto pt-[5%] flex flex-col items-center justify-center"
      >
        <h2 id="heading" className="font-heading text-3xl self-start! w-full">
          Physical Activity Readiness Questionnaire (PAR-Q)
        </h2>
        <hr className="border-1 border-primary-yellow yellow w-[20%] self-start mt-2" />
        <div
          id="physical-fitness-test-parq-content"
          className="apply-drop-shadow w-full flex flex-col justify-center items-center mt-10 font-content text-lg space-y-10"
        >
          <div id="instructions" className="w-[95%]">
            <p>Directions</p>
            <hr className="mb-7" />
            <ol className="list-decimal ml-7">
              <li>
                Take the Physical Activity Readiness Questionnaire (PAR-Q).
              </li>
              <li>
                Be honest in all your answers. <br />
                <br /> If you answered YES to one or more questions and have
                been inactive or concern about your health, consult a physician
                before taking a fitness test or substantially increasing your
                physical activity. <br />
                <br /> If you answered NO to all the PAR-Q questions, you can be
                reasonably sure that you can exercise safely and have a low risk
                of having any medical complications from exercise.
              </li>
            </ol>
          </div>
          <div
            id="instructions"
            className="w-[95%] min-h-10 flex flex-col space-y-2"
          >
            <label>
              <p>
                Full Name:
                <span className="text-accent-gray">
                  {' '}(Surname, First Name, M.I.)
                </span>
              </p>
              <input
                type="text"
                onChange={(e) =>
                  handleInformationChange('name', e.target.value)
                }
                className="border-1 border-[#8B8989] w-full font-content px-1 rounded-sm mt-0.5"
              />
            </label>
            <div className="flex flex-row space-x-5">
              <p>Gender</p>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={(e) =>
                    handleInformationChange('gender', e.target.value)
                  }
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={(e) =>
                    handleInformationChange('gender', e.target.value)
                  }
                />
                Female
              </label>
            </div>
            <label>
              <p>Email:</p>
              <input
                type="email"
                onChange={(e) =>
                  handleInformationChange('email', e.target.value)
                }
                className="border-1 border-[#8B8989] w-full font-content px-1 rounded-sm mt-0.5"
              />
            </label>
          </div>
          <div id="instructions" className="w-[95%] min-h-10">
            <p>PHYSICAL ACTIVITY READINESS QUESTIONNAIRE (PAR-Q)</p>
            <hr className="mb-7" />
            <ol className="list-decimal ml-7">
              {questions.map((question, index) => (
                <li key={index} className="mb-4">
                  {question}
                  <div className="flex flex-col mt-2">
                    <label>
                      <input type="radio" name={`radioQuestion${index}`} /> Yes
                    </label>
                    <label>
                      <input type="radio" name={`radioQuestion${index}`} /> No
                    </label>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
