"use client";

import React, { FC } from "react";
import { container } from "../../container";

type Props = {
  children: React.ReactNode;
};

const DependenciesContext = React.createContext<{
  container: typeof container;
}>({
  container,
});

const DependenciesProvider: FC<Props> = ({ children }) => {
  return (
    <DependenciesContext.Provider value={{ container }}>
      {children}
    </DependenciesContext.Provider>
  );
};

export { DependenciesProvider, DependenciesContext };
