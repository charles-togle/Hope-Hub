import { Link } from 'react-router-dom';

export default function CalculatorButton({ text, className, linkTo }) {
  return (
    <Link to={linkTo} className="block hover:contrast-125">
      <div id="calculator-button"
        className={`${className} bg-secondary-dark-blue text-white py-6 rounded mb-6`} >
        <p className="font-content text-2xl text-center text-white"> {text} </p>
      </div>
    </Link>
  );
}
