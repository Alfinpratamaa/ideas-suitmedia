// lib/urlFor.ts
import imageUrlBuilder from "@sanity/image-url";
import client from "./sanityClient";

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  if (!source) {
    console.warn("No source provided for image URL");
    return {
      url: () => "",
    };
  }
  return builder.image(source);
}
