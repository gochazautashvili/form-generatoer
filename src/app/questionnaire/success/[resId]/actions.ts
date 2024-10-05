"use server";

import db from "@/lib/db";
import { notFound } from "next/navigation";

export const getUserResByResId = async (resId: string) => {
  const res = await db.formSubmissions.findUnique({ where: { id: resId } });

  if (!res) notFound();

  return res;
};
