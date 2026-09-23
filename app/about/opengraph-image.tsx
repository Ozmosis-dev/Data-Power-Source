import { brandedSocialImage, SOCIAL_IMAGE_SIZE } from "@/lib/social-image";

export const alt = "About Data Power Source — serving Metro Atlanta since 1992";
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return brandedSocialImage({
    eyebrow: "About Data Power Source",
    title: "Owner-led electrical expertise since 1992.",
  });
}
