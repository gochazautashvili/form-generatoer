"use server";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import QRCode from "qrcode";

export const getQrCode = async (linkId: string) => {
  const link = await db.link.findUnique({ where: { id: linkId } });

  if (!link) return notFound();

  const code = await QRCode.toDataURL(
    `${process.env.NEXT_PUBLIC_URL}${link.link}`
  );

  return code;
};
