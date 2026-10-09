import { createImageUrlBuilder } from "@sanity/image-url";
import { projectId, dataset } from "./client";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "op0dbitw",
  dataset: dataset || "production",
});

export const urlForImage = (source: any) => {
  if (!source?.asset?._ref) {
    return "";
  }
  return imageBuilder.image(source).auto("format").fit("max").url();
};