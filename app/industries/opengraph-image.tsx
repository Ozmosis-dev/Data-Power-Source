import { brandedSocialImage, SOCIAL_IMAGE_SIZE } from "@/lib/social-image";

export const alt = "Data Power Source electrical systems by industry";
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return brandedSocialImage({
    eyebrow: "Industries",
    title: "Electrical systems built around your operating reality.",
    accent: "#3BA6ED",
  });
}
