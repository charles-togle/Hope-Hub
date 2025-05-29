export default function Pagination ({ onPrev, onNext, hasPrev, hasNext }) {
  return (
    <div className='flex justify-center gap-4 mt-6'>
      <button
        onClick={onPrev}
        disabled={!hasPrev}
        className={`px-4 py-2 rounded-md ${
          hasPrev
            ? 'bg-primary-yellow text-accent-dark-blue hover:bg-yellow-500'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {`< Prev`}
      </button>
      <button
        onClick={onNext}
        disabled={!hasNext}
        className={`px-4 py-2 rounded-md ${
          hasNext
            ? 'bg-primary-yellow text-accent-dark-blue hover:brightness-90'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {`Next >`}
      </button>
    </div>
  );
}
