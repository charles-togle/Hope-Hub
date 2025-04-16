export default function PageHeading({ text, className }) {
  return (
    <div id="page-heading" className={`${className} h-[25%] flex justify-center items-center flex-col border-b-2 border-black`}>
      <h1 className="font-heading text-5xl text-primary-blue">{text}</h1>
      <hr className="w-[20%] border-1 border-primary-yellow m-3"/>
      <p className="font-heading text-2xl">Power of Physical Education</p>
    </div>
  );
}
