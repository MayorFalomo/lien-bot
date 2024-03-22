import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import AppContextProvider from "./helper/ContextProvider";
import Template from "./template";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lien-Bot App",
  description: "A web-app for generating a lien file using AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          <AppContextProvider>
            <Template>{children}</Template>
          </AppContextProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
