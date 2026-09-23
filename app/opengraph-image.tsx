import { brandedSocialImage, SOCIAL_IMAGE_SIZE } from "@/lib/social-image";

export const alt = "Data Power Source — Metro Atlanta & the SE US Commercial & Industrial Electrical Contractor";
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return brandedSocialImage({
    eyebrow: "Metro Atlanta & the SE US · Commercial & Industrial",
    title: "Power you can build on — installed right, kept running.",
  });
}
