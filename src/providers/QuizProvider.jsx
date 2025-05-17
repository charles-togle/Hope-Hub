import { useRef } from 'react';
import { IdentificationRefContext } from '@/contexts/IdentificationRefContext';

export default function QuizProvider({ children }) {
  const identificationAnswerRef = useRef('');

  return (
    <IdentificationRefContext.Provider value={identificationAnswerRef}>
      {children}
    </IdentificationRefContext.Provider>
  );
}
