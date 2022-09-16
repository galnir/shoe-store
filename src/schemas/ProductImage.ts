import "dotenv/config";
import { cloudinaryImage } from "@keystone-6/cloudinary";
import { list } from "@keystone-6/core";
import { text, relationship } from "@keystone-6/core/fields";

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
  apiKey: process.env.CLOUDINARY_KEY || "",
  apiSecret: process.env.CLOUDINARY_SECRET || "",
  folder: "abibas",
};

export const ProductImage = list({
  fields: {
    image: cloudinaryImage({
      cloudinary,
      label: "Source",
    }),
    altText: text(),
    product: relationship({ ref: "Product.photo" }),
    filename: text(),
    originalFilename: text(),
    mimetype: text(),
    encoding: text(),
  },
  ui: {
    listView: {
      initialColumns: ["image", "altText", "product"],
    },
  },
});