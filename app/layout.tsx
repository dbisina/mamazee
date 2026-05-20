import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import GrainOverlay from "@/components/GrainOverlay";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mamazee | Authentic Nigerian Groceries",
  description:
    "Premium Nigerian groceries, spices, and pantry staples. Delivered fresh to your door across Australia.",
  openGraph: {
    title: "Mamazee | Authentic Nigerian Groceries",
    description: "Premium Nigerian groceries, spices, and pantry staples.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
      style={{ backgroundColor: "#F8F4EE" }}
    >
      <body className="min-h-full" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
        <CartProvider>
          <GrainOverlay />
          {children}
          <CartDrawer />
          <WhatsAppFloat />
        </CartProvider>
      </body>
    </html>
  );
}
