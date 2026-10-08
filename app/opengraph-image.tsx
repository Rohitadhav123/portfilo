import { ImageResponse } from "next/og";

export const alt = "Rohit Adhav — Full-Stack Web Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#07070A",
          padding: "80px",
          fontFamily: "sans-serif",
          color: "#F4F4F8",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.25) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(34, 211, 238, 0.25) 0%, transparent 40%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            padding: "10px 20px",
            borderRadius: "50px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            fontSize: "18px",
            color: "#22D3EE",
            letterSpacing: "2px",
          }}
        >
          <span>FULL-STACK WEB DEVELOPER</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h1
            style={{
              fontSize: "76px",
              fontWeight: 900,
              letterSpacing: "-2px",
              margin: 0,
              lineHeight: 1,
              color: "#FFFFFF",
            }}
          >
            ROHIT ADHAV
          </h1>
          <p
            style={{
              fontSize: "24px",
              color: "#9A9AB0",
              maxWidth: "800px",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            Building scalable digital products with Next.js, React, Node.js and
            modern backend architecture.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            fontSize: "18px",
            color: "#8B5CF6",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "32px",
          }}
        >
          <span>rohitadhav.vercel.app</span>
          <span>adhavrohit37@gmail.com</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
