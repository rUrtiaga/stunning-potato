import { createContext } from "react";

const LostPetsContext = createContext();
const LostPetsProvider = LostPetsContext.Provider;
const LostPetsConsumer = LostPetsContext.Consumer;
// export  LostPetsContext;
export { LostPetsContext, LostPetsProvider, LostPetsConsumer };
