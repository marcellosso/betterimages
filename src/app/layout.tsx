import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { TriggerProvider } from "@trigger.dev/react";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import { ptBR } from "@clerk/localizations";
import { GoogleAnalytics } from "@next/third-parties/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://photoshd.com.br"),
  alternates: {
    canonical: "/",
  },
  title: "PhotosHD - Deixe sua imagem em HD",
  description:
    "Deixe sua imagem com alta qualidade. Cansado de imagens borradas, antigas e com baixa qualidade? Utilize nossa tecnologia de Inteligência Artificial (IA) para melhorar sua imagem. Nunca mais faça um post em suas redes sociais fotos com qualidade ruin, deixa elas em HD com apenas um clique. Possuí aquela imagem antiga de família que gostaria de recuperar? PhotosHD resolve o problema para você.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <ClerkProvider
        signInUrl="/sign-in"
        signUpUrl="/sign-up"
        localization={ptBR}
      >
        <TriggerProvider
          publicApiKey={process.env.NEXT_PUBLIC_TRIGGER_PUBLIC_API_KEY!}
        >
          <body
            className={cn(
              "min-h-screen bg-background font-sans antialiased relative",
              fontSans.variable
            )}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              disableTransitionOnChange
            >
              <div className="bg-grid"></div>
              <Navbar />
              {children}
              <Footer />
              <Toaster />
            </ThemeProvider>
          </body>
        </TriggerProvider>
      </ClerkProvider>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS!} />
    </html>
  );
}
