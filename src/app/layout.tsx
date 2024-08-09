"use client";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider, useTheme } from "@/Contexts/ThemeContext";
import Navbar from "@/Components/Stateless/Navbar";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <head>
        <title>Bazinga</title>
        <meta name="description" content="Bazinga" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
      </head>
      <body>
        <SessionProvider>
          <ThemeProvider>

            <BodyWithTheme>
                <Navbar/>
                {children}</BodyWithTheme>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;

const BodyWithTheme = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return <div className={theme === "dark" ? "bg-gray-950 text-white relative" : "relative"}>{children}</div>;
};
