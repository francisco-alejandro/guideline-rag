"use client";

import { DependenciesProvider } from "../context";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return <DependenciesProvider>{children}</DependenciesProvider>;
};
