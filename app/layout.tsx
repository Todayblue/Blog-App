import "./globals.css";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import Navbar from "@/components/Navbar";
import { NextAuthProvider } from "@/components/Provider";
import QueryProvider from "@/components/QueryProvider";

const lato = Lato({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DogWorld",
  description: "web blog and forums",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${lato.className} px-10`}>
        <QueryProvider>
          <NextAuthProvider>
            <Navbar />
            {children}
          </NextAuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
