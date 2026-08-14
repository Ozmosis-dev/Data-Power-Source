import { brandedSocialImage, SOCIAL_IMAGE_SIZE } from "@/lib/social-image";

export const alt = "Request a commercial electrical project quote from Data Power Source";
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return brandedSocialImage({
    eyebrow: "Plan your next project",
    title: "Request a commercial electrical project quote.",
  });
}
