import type { Metadata } from "next";
import { Gabarito } from "next/font/google";
import "../styles/globals.css";

const gabarito = Gabarito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EVLO - EV Battery Diagnostics",
  description: "Professional EV battery health scoring and diagnostics",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={gabarito.className}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          {children}
        </div>
      </body>
    </html>
  );
}
