import { ImageResponse } from "next/og";

export const alt = "Felizzi Store";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#eadfd4",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#1b1714",
        }}
      >
        <div style={{ fontSize: 42, letterSpacing: 18, fontFamily: "Georgia, serif" }}>FZ</div>
        <div style={{ marginTop: 24, fontSize: 72, letterSpacing: 16, fontFamily: "Georgia, serif" }}>FELIZZI</div>
        <div style={{ marginTop: 20, fontSize: 22, letterSpacing: 6, textTransform: "uppercase" }}>
          Moda para o seu momento
        </div>
      </div>
    ),
    size,
  );
}
