import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#031126",
          color: "white",
          display: "flex",
          fontSize: "48px",
          fontWeight: 700,
          height: "100%",
          justifyContent: "center",
          letterSpacing: "-2px",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            border: "6px solid #357CDB",
            borderRadius: "22px",
            display: "flex",
            height: "132px",
            justifyContent: "center",
            width: "132px",
          }}
        >
          DPS
        </div>
      </div>
    ),
    size,
  );
}
