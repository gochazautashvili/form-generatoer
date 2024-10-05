"use server";
import db from "@/lib/db";
import { cookies } from "next/headers";
import { cache } from "react";

export const getOrganization = cache(async () => {
  const orgId = cookies().get("organization_session")?.value;

  if (!orgId) return null;

  const organization = await db.organization.findUnique({
    where: { id: orgId },
  });

  return organization;
});
