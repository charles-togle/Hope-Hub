import { useState } from "react";

export const PhysicalFitnessDataProvider = ({ children }) => {
  const [physicalFitnessData, setPhysicalFitnessData] = useState({
    name: "",
    gender: "",
    email: "",
  });

  return (
    <physicalFitnessTestContext.Provider
      value={{ physicalFitnessData, setPhysicalFitnessData }}
    >
      {children}
    </physicalFitnessTestContext.Provider>
  );
};

export default PhysicalFitnessDataProvider;