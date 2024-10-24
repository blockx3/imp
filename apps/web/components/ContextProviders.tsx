"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

function ContextProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </NextThemesProvider>
    </>
  );
}

export default ContextProviders;
