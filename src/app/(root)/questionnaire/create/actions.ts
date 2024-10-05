"use server";
import db from "@/lib/db";
import { AiChatSession } from "./AiChat";
import { getOrganization } from "@/data/auth";
import { revalidatePath } from "next/cache";

const PROMPT = process.env.AI_GENERATOR_PROMPT_SECOND;

export const AiFormGenerate = async (prompt: string) => {
  try {
    if (!prompt) {
      return { error: "Prompt is required!" };
    }

    const org = await getOrganization();

    if (!org) {
      return { error: "Organization not found" };
    }

    const message = `Description: ${prompt}${PROMPT}`;
    const result = await AiChatSession.sendMessage(message);
    const content = result.response.text();

    await db.form.upsert({
      where: { organizationId: org.id },
      create: {
        content,
        organizationId: org.id,
        links: { create: {} },
        prompt: prompt,
      },
      update: { content, prompt },
    });

    revalidatePath("/questionnaire/create");
    return {
      success: true,
      message: "Form Successfully Generated :)",
      form: content,
    };
  } catch (_) {
    return { error: "Something went wrong!" };
  }
};

export const getOrgForm = async () => {
  const org = await getOrganization();

  if (!org) return null;

  const form = await db.form.findUnique({
    where: { organizationId: org.id },
    include: { links: true },
  });

  return form;
};

export const create_field = async (content: string) => {
  try {
    const org = await getOrganization();

    if (!org) {
      return { error: "User not found" };
    }

    await db.form.upsert({
      where: { organizationId: org.id },
      create: {
        content,
        organizationId: org.id,
        links: { create: {} },
        prompt: "",
      },
      update: { content },
    });

    revalidatePath("/questionnaire/create");
    return {
      success: true,
      message: "Form Filed Successfully Created :)",
    };
  } catch (_) {
    return { error: "Something went wrong" };
  }
};

export const delete_form = async () => {
  try {
    const org = await getOrganization();

    if (!org) {
      return { error: "User not found" };
    }

    await db.$transaction([
      db.link.deleteMany({ where: { form: { organizationId: org.id } } }),
      db.form.delete({ where: { organizationId: org.id } }),
    ]);

    revalidatePath("/questionnaire/create");
    return {
      success: true,
      message: "Form Filed Successfully Deleted :)",
    };
  } catch (_) {
    return { error: "Something went wrong" };
  }
};
