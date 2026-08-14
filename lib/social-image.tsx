import { ImageResponse } from "next/og";

export const SOCIAL_IMAGE_SIZE = { width: 1200, height: 630 } as const;

export function brandedSocialImage({
  eyebrow,
  title,
  accent = "#357CDB",
}: {
  eyebrow: string;
  title: string;
  accent?: string;
}) {
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
          padding: "68px 78px",
          width: "100%",
        }}
      >
        <div style={{ alignItems: "center", display: "flex", gap: "18px" }}>
          <div
            style={{
              alignItems: "center",
              border: `3px solid ${accent}`,
              borderRadius: "8px",
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
            <span
              style={{ color: "#A1ACBA", fontSize: "16px", letterSpacing: "4px", marginTop: "7px" }}
            >
              ELECTRICAL SOLUTIONS FOR BUSINESS CONTINUITY
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: "1000px" }}>
          <span style={{ color: accent, fontSize: "18px", fontWeight: 700, letterSpacing: "4px" }}>
            {eyebrow.toUpperCase()}
          </span>
          <span
            style={{
              fontSize: "62px",
              fontWeight: 700,
              letterSpacing: "-2px",
              lineHeight: 1.04,
              marginTop: "22px",
            }}
          >
            {title}
          </span>
        </div>

        <div
          style={{
            borderTop: "1px solid #243D5D",
            color: "#A1ACBA",
            display: "flex",
            fontSize: "18px",
            justifyContent: "space-between",
            paddingTop: "20px",
          }}
        >
          <span>Metro Atlanta · Serving commercial and industrial facilities since 2001</span>
          <span>(770) 498-9622</span>
        </div>
      </div>
    ),
    SOCIAL_IMAGE_SIZE,
  );
}
