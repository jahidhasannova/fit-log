import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FitLogProvider } from "@/context/FitLogContext";
import Footer from "@/components/Footer";

export const metadata = {
  title: "FitLog",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FitLogProvider>
          {children}
          <Footer />
          <ToastContainer position="top-right" />
        </FitLogProvider>
      </body>
    </html>
  );
}