import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import OrganizationProvider from "@/context/OrganizationProvider";
import { getOrganization } from "@/data/auth";

export const metadata: Metadata = {
  title: "Management",
  description: "Management system",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const org = await getOrganization();

  return (
    <html lang="en">
      <body>
        <OrganizationProvider value={org}>{children}</OrganizationProvider>
        <Toaster />
      </body>
    </html>
  );
}
