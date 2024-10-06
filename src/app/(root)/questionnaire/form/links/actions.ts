"use server";
import { getOrganization } from "@/data/auth";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { link_schema, TLink_schema } from "./validations";

export const getFormLinks = async () => {
  const org = await getOrganization();

  if (!org) return notFound();

  const form = await db.form.findUnique({
    where: { organizationId: org.id },
    select: { links: true },
  });

  if (!form) return notFound();

  return form.links;
};

export const delete_link = async (linkId: string) => {
  try {
    await db.$transaction([
      db.formSubmissions.deleteMany({ where: { linkId } }),
      db.link.delete({ where: { id: linkId } }),
    ]);

    revalidatePath("questionnaire/form/links");
    return { success: true, message: "Link successfully deleted" };
  } catch (_) {
    return { error: "Something went wrong" };
  }
};

export const edit_link = async (
  value: TLink_schema,
  linkId: string,
  formId: string
) => {
  try {
    const { data, error } = link_schema.safeParse(value);

    if (error) {
      return { error: error.message };
    }

    const link = `/questionnaire/form/${formId}/${linkId}`;

    await db.link.update({
      where: { id: linkId },
      data: { ...data, link },
    });

    revalidatePath("questionnaire/form/links");
    return { success: true, message: "Link successfully Updated" };
  } catch (_) {
    return {
      error: "Something went wrong! tray again. also Code is unique field",
    };
  }
};

export const delete_all_link = async (linkIds: string[]) => {
  try {
    await db.$transaction([
      db.formSubmissions.deleteMany({
        where: { linkId: { in: linkIds } },
      }),
      db.link.deleteMany({
        where: { id: { in: linkIds } },
      }),
    ]);

    revalidatePath("questionnaire/form/links");
    return { success: true, message: "Links successfully deleted" };
  } catch (e) {
    console.log(e);

    return { error: "Something went wrong! while deleting links" };
  }
};
