import React, { createContext, useContext, useState } from "react";

const DesignContext = createContext();

export function DesignProvider({ children }) {
  const [designs, setDesigns] = useState([]);

  const addDesign = (design) => {
    setDesigns((prev) => [...prev, { ...design, id: Date.now() }]);
  };

  const removeDesign = (id) => {
    setDesigns((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <DesignContext.Provider value={{ designs, addDesign, removeDesign }}>
      {children}
    </DesignContext.Provider>
  );
}

export const useDesigns = () => useContext(DesignContext);
