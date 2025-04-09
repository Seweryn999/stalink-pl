"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="top-right"
      duration={4000}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group border border-slate-200/60 bg-white/90 dark:bg-slate-900/80 text-gray-900 dark:text-white shadow-xl backdrop-blur-lg rounded-xl px-4 py-3",
          title: "font-semibold text-base",
          description: "text-sm opacity-90",
          actionButton:
            "bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-1 px-3 rounded-md",
          cancelButton: "text-gray-500 hover:text-gray-700 text-sm font-medium",
        },
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
