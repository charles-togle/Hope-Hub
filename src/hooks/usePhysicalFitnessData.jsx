import { useContext } from "react";
import { createContext } from "react";

export const physicalFitnessTestContext = createContext();

export const usePhysicalFitnessData = () => {
    const context = useContext(physicalFitnessTestContext)

    if(!context){
        throw new Error("usePhysicalFitnessData must be used within a provider");
    }
    return context;
}

