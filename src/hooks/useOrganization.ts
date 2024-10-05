import { orgContext } from "@/context/OrganizationProvider";
import { useContext } from "react";

const useOrganization = () => {
  const organization = useContext(orgContext);

  return organization;
};

export default useOrganization;
