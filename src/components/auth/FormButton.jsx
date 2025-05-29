export default function FormButton ({
  onClick = () => {},
  text,
  className,
  disabled,
}) {
  return (
    <button
      className={`${className} w-full pt-2 pb-2 font-heading bg-accent-blue text-white text-2xl rounded-sm cursor-pointer hover:brightness-90`}
      onClick={() => onClick()}
      disabled={disabled ? disabled : undefined}
    >
      {text}
    </button>
  );
}
