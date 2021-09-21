import React, { createContext, useState } from "react";

const LocationContext = createContext();

const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState("Lagos,Nigeria");

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export { LocationProvider, LocationContext };
