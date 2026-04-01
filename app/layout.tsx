import type { Metadata } from "next";
import "./globals.css";
import { lato, medievalSharp } from "@/lib/fonts";
import { SocketProvider } from "@/components/providers/SocketProvider";
import { TokenProvider } from "@/components/providers/TokenProvider";

export const metadata: Metadata = {
  title: "Labyr",
  description:
    "Devenez membre de Labyr, parcourez les labyrinthes et partagez vos expériences avec la communauté.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${medievalSharp.variable} ${lato.className} h-full antialiased`}
    >
      <body
        className={`min-h-full flex flex-col ${medievalSharp.variable} ${lato.className} antialiased`}
      >
        <SocketProvider>
          <TokenProvider>{children}</TokenProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
