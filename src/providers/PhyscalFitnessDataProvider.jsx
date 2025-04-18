import { PhysicalFitnessTestContext } from "@/hooks/usePhysicalFitnessData";
import { useState } from "react";

export const PhysicalFitnessDataProvider = ({ children }) => {
  const [physicalFitnessData, setPhysicalFitnessData] = useState({
    name: "",
    gender: "",
    email: "",
    isPARQFinished: false
  });

  return (
    <PhysicalFitnessTestContext.Provider
      value={{ physicalFitnessData, setPhysicalFitnessData }}
    >
      {children}
    </PhysicalFitnessTestContext.Provider>
  );
};

export default PhysicalFitnessDataProvider;