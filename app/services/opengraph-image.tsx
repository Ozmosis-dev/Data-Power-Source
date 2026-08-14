import { brandedSocialImage, SOCIAL_IMAGE_SIZE } from "@/lib/social-image";

export const alt = "Data Power Source commercial electrical services";
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return brandedSocialImage({
    eyebrow: "Commercial electrical services",
    title: "Design, install, and maintain — under one roof.",
  });
}
