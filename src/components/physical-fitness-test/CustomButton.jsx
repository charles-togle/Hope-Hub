import { useState } from 'react';

export default function CustomButton({ className, onClick, ...props }) {
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <button
      className={`${className} cursor-pointer`}
      onClick={() => {
        setIsDisabled(!isDisabled);
        onClick();
      }}
      disabled={isDisabled || props.disabled}
      {...props}
    >
      {props.children}
    </button>
  );
}
