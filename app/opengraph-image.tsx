import { ImageResponse } from "next/og";

export const alt = "Data Power Source — Electrical Solutions for Business Continuity";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#031126",
          color: "#F5F7FA",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px 82px",
          width: "100%",
        }}
      >
        <div style={{ alignItems: "center", display: "flex", gap: "18px" }}>
          <div
            style={{
              alignItems: "center",
              border: "3px solid #357CDB",
              borderRadius: "8px",
              color: "#F5F7FA",
              display: "flex",
              fontSize: "24px",
              fontWeight: 700,
              height: "76px",
              justifyContent: "center",
              letterSpacing: "-1px",
              width: "76px",
            }}
          >
            DPS
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "32px", fontWeight: 700, letterSpacing: "1px" }}>
              DATA POWER SOURCE
            </span>
            <span style={{ color: "#A1ACBA", fontSize: "16px", letterSpacing: "4px", marginTop: "7px" }}>
              ELECTRICAL SOLUTIONS
            </span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "900px" }}>
          <span style={{ color: "#679DE4", fontSize: "18px", fontWeight: 700, letterSpacing: "4px" }}>
            METRO ATLANTA · COMMERCIAL & INDUSTRIAL
          </span>
          <span style={{ fontSize: "64px", fontWeight: 700, letterSpacing: "-2px", lineHeight: 1.05, marginTop: "24px" }}>
            Power you can build on — installed right, kept running.
          </span>
        </div>
        <div
          style={{
            borderTop: "1px solid #243D5D",
            color: "#A1ACBA",
            display: "flex",
            fontSize: "18px",
            justifyContent: "space-between",
            paddingTop: "22px",
          }}
        >
          <span>25 years · NFPA 70E · 24/7 emergency</span>
          <span>(770) 498-9622</span>
        </div>
      </div>
    ),
    size,
  );
}
