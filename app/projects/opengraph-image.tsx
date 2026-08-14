import { brandedSocialImage, SOCIAL_IMAGE_SIZE } from "@/lib/social-image";

export const alt = "Data Power Source commercial electrical project case studies";
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return brandedSocialImage({
    eyebrow: "Project case studies",
    title: "Power installed. Operations protected.",
    accent: "#3BA6ED",
  });
}
