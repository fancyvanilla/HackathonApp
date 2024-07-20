import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import "./globals.css";
import { AuthProvider } from '@/components/authentification/AuthContext';
import { useRouter } from 'next/router';
import { LoadingProvider } from "@/components/loading/loadingProvider";
import Footer from '@/components/ui/Footer'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Live Tounsi",
  description: "We help you connect with local guides.",
  icons: {
    icon: '/images/logo.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
    <html lang="en">
      <body className={inter.className}>
      <LoadingProvider>
      <AppRouterCacheProvider>
        {children}
        <Footer/>
      </AppRouterCacheProvider>
      </LoadingProvider>
        </body>
    </html>
    </AuthProvider>

  );
}
