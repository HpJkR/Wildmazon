import NavigationMenuTab from "@/components/component/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  pageTitle,
}: Readonly<{
  children: React.ReactNode;
  pageTitle: string;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NavigationMenuTab />
      {children}
      <Toaster />
    </ThemeProvider>
  );
}
