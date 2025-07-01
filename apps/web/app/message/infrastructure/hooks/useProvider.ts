"use client";

import { useContext } from "react";
import { DependenciesContext } from "../context";

export const useProvider = <T>(token: string): T => {
  const { container } = useContext(DependenciesContext);

  return container.get<T>(token);
};
