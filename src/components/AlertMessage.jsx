export function AlertMessage({
  text,
  onConfirm = () => {},
  onCancel = () => {},
}) {
  return (
    <div
      id="modal"
      className="w-full h-screen fixed top-0 flex justify-center items-center z-1 font-content"
    >
      <div
        id="background"
        className="w-full h-full bg-black opacity-50 absolute"
      ></div>
      <div
        id="modal-content"
        className="bg-secondary-dark-blue w-[50%] h-[40%] z-2 flex justify-center items-center relative p-20 text-center font-semibold"
      >
        <p className="text-white mb-15 text-wrap">{text}</p>
        <div
          id="buttons"
          className="absolute bottom-10 right-10 flex space-x-5"
        >
          <button
            className="px-7 py-2 bg-primary-yellow text-black hover:brightness-90"
            onClick={() => onCancel}
          >
            Cancel
          </button>
          <button
            className="px-7 py-2 bg-white text-black hover:brightness-90"
            onClick={() => onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
