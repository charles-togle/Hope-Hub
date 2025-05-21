export function TipsAndInterpretation({
    testResults,
    testName,
}) {
  return (
    <div
      id="interpretation-and-tips"
      className="border-2 p-5 border-black rounded-2xl relative lg:p-10 overflow-x-hidden"
    >
      <div id="heading" className="flex flex-row items-center justify-between">
        <h1 className="text-3xl font-md mb-3 font-bold font-content pr-2">
          Interpretation
        </h1>
        <hr className="w-[50%] border-1 border-black -mr-10" />
      </div>
      <hr className="w-[50%] border-1 border-black mb-1" />
      <div id="interpretation" className="mb-3">
        <h2 className="font-semibold text-lg font-content">{testName}</h2>
        <p className="ml-2 font-bold text-lg font-content">
          {testResults.reps} : {testResults.classification}
        </p>
      </div>
      <div id="tips" className="pb-10">
        <h2 className="font-content text-sm font-semibold">Tips to Improve</h2>
        <ul className="list-decimal ml-6 font-content text-sm font-medium">
          <li>
            Lorem ipsum dolor sit amet consectetur. Sed augue ultrices phasellus
            mi nulla nisi sollicitudin sagittis.
          </li>
          <li>
            Pharetra tellus pellentesque faucibus fusce eget sagittis. Cursus
            sed gravida pellentesque quam.
          </li>
          <li>
            Eget justo sit tortor amet in eu diam velit. Id facilisi metus in
            fames faucibus viverra ullamcorper bibendum.
          </li>
        </ul>
      </div>
      <hr className="-ml-10 border-1 border-black w-[50%]" />
    </div>
  );
}
