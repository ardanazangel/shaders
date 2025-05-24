import { ReactLenis } from "lenis/react";
import "./globals.css";
import Grid from "./components/Grid";

export const metadata = {
  title: "Silencio",
  description: "Plantilla de Next.js @silencio.es",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <ReactLenis root>
          <Grid />
          <div id="transition-wrapper">{children}</div>
        </ReactLenis>
      </body>
    </html>
  );
}
