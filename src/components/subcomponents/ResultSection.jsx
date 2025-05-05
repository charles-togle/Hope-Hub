import { Fragment } from 'react';

export function ResultSection({
  testResults,
  testName,
  handleResultChange,
  handleSubmit,
  currentTime
}) {
  return (
    <div
      id="results"
      className="p-5 mt-5 mb-5 overflow-x-hidden border-2 border-black rounded-2xl relative font-content lg:p-10 lg:mb-5 lg:mt-0"
    >
      <div id="heading" className="flex flex-row  justify-between items-center">
        <h1 className="text-3xl font-bold mb-3">Results</h1>
        <hr className="font-md text-2xl w-[50%] border-1 border-black -mr-10 mb-1" />
      </div>
      <hr className="w-[50%] border-1 border-black" />
      <div id="data" className="flex flex-col relative ml-3">
        <h2 className="font-semibold text-lg pointer-events-none">
          {testName}
        </h2>
        <div
          id="inputs"
          className="ml-2 grid grid-cols-2 divide-x divide-black"
        >
          {['Reps', 'Sets', 'Time Started', 'Time End'].map((label, index) => (
            <Fragment key={`${index} ${label}`}>
              <label
                htmlFor={label}
                className="p-1 lg:text-lg md:text-sm sm:text-xs"
              >
                {label}:{' '}
              </label>
              <input
                onChange={(e) => {
                  let value = e.target.value;

                  if (label !== 'Time Started' && label !== 'Time End') {
                    value = Math.max(-1, Math.min(999, value));
                  }
                  handleResultChange(label, value);
                }}
                type={
                  label === 'Time Started' || label === 'Time End'
                    ? 'time'
                    : 'number'
                }
                min={
                  label === 'Time Started'
                    ? ''
                    : label === 'Time End'
                    ? currentTime
                    : '-1'
                }
                max={
                  label !== 'Time Started' && label !== 'Time End'
                    ? '999'
                    : undefined
                }
                value={
                  label === 'Reps'
                    ? testResults.reps
                    : label === 'Sets'
                    ? testResults.sets
                    : label === 'Time Started'
                    ? testResults.timeStarted
                    : testResults.timeEnded
                }
                disabled={label === 'Time Started'}
                name={label}
                id={label}
                className="w-[85%] place-self-center h-fit border-1 border-black text-center font-content rounded-sm lg:px-2 "
              />
            </Fragment>
          ))}
        </div>
        <hr className="absolute -bottom-3 right-0 w-[35%] border-1 border-black" />
      </div>
      <div id="button" className="flex flex-row items-center justify-between">
        <hr className="-ml-10 border-1 border-black w-[50%]" />
        <button
          onClick={() => handleSubmit()}
          type="button"
          className="border-1 border-black rounded-md px-5 py-1 mt-5 text-sm bg-white hover:brightness-95"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
