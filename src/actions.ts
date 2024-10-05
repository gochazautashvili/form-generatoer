"use server";
import { revalidatePath } from "next/cache";
import { getOrganization } from "./data/auth";
import db from "./lib/db";
import { StylesType } from "./types";

export const submit_form = async (
  content: string,
  orgId: string,
  linkId: string | undefined
) => {
  try {
    if (!orgId || !linkId) {
      return { error: "Link not found" };
    }

    const res = await db.formSubmissions.create({
      data: {
        linkId,
        content,
        organizationId: orgId,
      },
    });

    return {
      success: true,
      message: "Form successfully submitted",
      url: `/questionnaire/success/${res.id}`,
    };
  } catch (_) {
    return { error: "Something went wrong" };
  }
};

export const deleted_user_res = async (resId: string) => {
  try {
    const org = await getOrganization();

    if (!org) {
      return { error: "Organization Not found" };
    }

    await db.formSubmissions.delete({
      where: { id: resId, organizationId: org.id },
    });

    revalidatePath("/");
    return {
      success: true,
      message: "Response submit successfully",
    };
  } catch (_) {
    return { error: "Something went wrong" };
  }
};

export const getUserResponses = async () => {
  const org = await getOrganization();

  if (!org) return null;

  const res = await db.organization.findUnique({
    where: { id: org.id },
    select: { formSubmissions: { include: { link: true } } },
  });

  return res;
};

export const delete_filed = async (content: string, formId: string) => {
  try {
    await db.form.update({
      where: { id: formId },
      data: { content },
    });

    revalidatePath("/questionnaire/create");
    return { success: true, message: "Filed Successfully Deleted" };
  } catch (_) {
    return { error: "Something went wrong!" };
  }
};

export const publish_form = async () => {
  try {
    const org = await getOrganization();

    if (!org) {
      return { error: "User not found" };
    }

    const form = await db.form.findUnique({
      where: { organizationId: org.id },
    });

    if (!form) {
      return { error: "Form not found" };
    }

    if (!form.published) {
      const form = await db.form.update({
        where: { organizationId: org.id },
        select: { links: true, id: true },
        data: { published: true },
      });

      const links = form.links.map((link) => {
        return `/questionnaire/form/${form.id}/${link.id}`;
      });

      await Promise.all(
        links.map((link) =>
          db.link.updateMany({
            where: { formId: form.id },
            data: { link },
          })
        )
      );

      revalidatePath("/questionnaire/create");
      return { success: true, message: "Form Published" };
    }

    await db.form.update({
      where: { organizationId: org.id },
      data: { published: false },
    });

    revalidatePath("/questionnaire/create");
    return { success: true, message: "Form is not published eny more" };
  } catch (_) {
    return { error: "Something went wrong!" };
  }
};

export const edit_styles = async (styles: StylesType) => {
  try {
    const {
      background,
      borderColor,
      borderWidth,
      formBackground,
      textColor,
      formBorder,
    } = styles;
    const org = await getOrganization();

    if (!org) {
      return { error: "Organization not found" };
    }

    await db.form.update({
      where: { organizationId: org.id },
      data: {
        background,
        borderColor,
        borderWidth,
        formBackground,
        textColor,
        formBorder,
      },
    });

    revalidatePath("/questionnaire/create");
    return { success: true, message: "Form styles successfully updated" };
  } catch (_) {
    return { error: "Something went wrong!" };
  }
};

export const generate_form_links = async (length: number) => {
  try {
    const org = await getOrganization();

    if (!org) {
      return { error: "Organization not found" };
    }

    const form = await db.form.findUnique({
      where: { organizationId: org.id },
    });

    if (!form) {
      return { error: "FormId not found" };
    }

    const existingLinks = await db.link.findMany({
      where: { formId: form.id },
    });

    if (existingLinks.length >= 20) {
      return { error: "You already have a 20 link. you can not have more" };
    }

    const data = Array.from({ length });

    await db.link.createMany({
      data: data.map(() => ({ formId: form.id })),
    });

    revalidatePath("/questionnaire/create");
    return {
      success: true,
      message: "Form links successfully generated :)",
    };
  } catch (e) {
    console.log(e);

    return { error: "Something went wrong!" };
  }
};
