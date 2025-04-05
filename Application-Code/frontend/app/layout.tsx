import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import ContextProvider from "@/providers/ContextProvider"
import { Toaster } from "react-hot-toast";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],

});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" 
        integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" 
        crossOrigin="anonymous" 
        referrerPolicy="no-referrer" />
      </head>
      <body
        className={`${roboto.className} antialiased`}
      >
        <Toaster position="top-center" />
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
