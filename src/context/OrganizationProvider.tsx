"use client";
import { Organization } from "@prisma/client";
import { createContext, ReactNode } from "react";

interface Props {
  children: ReactNode;
  value: Organization | null;
}

export const orgContext = createContext<Organization | null>(null);

const OrganizationProvider = ({ children, value }: Props) => {
  return <orgContext.Provider value={value}>{children}</orgContext.Provider>;
};

export default OrganizationProvider;
