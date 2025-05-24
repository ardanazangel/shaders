import { ReactLenis } from "lenis/react";
import "./globals.css";
import Grid from "./components/Grid";
import ScrollBlocker from "./components/ScrollBlocker";
import Escene from "./components/Experience";

export const metadata = {
  title: "Silencio",
  description: "Plantilla de Next.js @silencio.es",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <ScrollBlocker />
      <body>
        <ReactLenis root>
          <Grid />
          <Escene />
          <div id="transition-wrapper">{children}</div>
        </ReactLenis>
      </body>
    </html>
  );
}
