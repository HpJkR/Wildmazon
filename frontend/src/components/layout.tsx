
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import NavigationMenuTab from '@/components/component/Navbar';

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
  pageTitle
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
    </ThemeProvider>
  );
}
