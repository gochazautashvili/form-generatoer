"use server";

import db from "@/lib/db";

export const getFormByFormId = async (formId: string) => {
  if (!formId) return null;

  const form = await db.form.findUnique({
    where: { id: formId, published: true },
    include: { links: { take: 1 } },
  });

  return form;
};
