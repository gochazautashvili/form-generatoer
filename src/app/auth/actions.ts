"use server";
import db from "@/lib/db";
import {
  organization_schema_sign_in,
  organization_schema_sign_in_type,
  organization_schema_sign_up,
  organization_schema_sign_up_type,
} from "./validations";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

export const org_sing_in = async (values: organization_schema_sign_in_type) => {
  try {
    const { data, error } = organization_schema_sign_in.safeParse(values);

    if (error) {
      return { error: error.message };
    }

    const existingOrganization = await db.organization.findUnique({
      where: { email: data.email },
    });

    if (!existingOrganization) {
      return { error: "Organization not found" };
    }

    const comparePassword = await bcrypt.compare(
      data.password,
      existingOrganization.hashPassword
    );

    if (!comparePassword) {
      return { error: "Organization not found" };
    }

    cookies().set("organization_session", existingOrganization.id, {
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 1,
      sameSite: "strict",
      httpOnly: true,
      path: "/",
    });

    return { success: true };
  } catch (_) {
    return { error: "Something went wrong!" };
  }
};

export const org_sing_up = async (values: organization_schema_sign_up_type) => {
  try {
    const { data, error } = organization_schema_sign_up.safeParse(values);

    if (error) {
      return { error: error.message };
    }

    const existingOrganization = await db.organization.findUnique({
      where: { email: data.email },
    });

    if (existingOrganization) {
      return { error: "Organization already exist" };
    }

    const hashPassword = await bcrypt.hash(data.password, 10);

    const organization = await db.organization.create({
      data: { email: data.email, name: data.name, hashPassword },
    });

    cookies().set("organization_session", organization.id, {
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 1,
      sameSite: "strict",
      httpOnly: true,
      path: "/",
    });

    return { success: true };
  } catch (_) {
    return { error: "Something went wrong!" };
  }
};

export const org_sign_out = async () => {
  try {
    cookies().delete("organization_session");

    return { success: true };
  } catch (_) {
    return { error: "Something went wrong!" };
  }
};
