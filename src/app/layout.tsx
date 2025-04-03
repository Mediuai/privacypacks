import Script from "next/script";

import { Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`} suppressHydrationWarning>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
