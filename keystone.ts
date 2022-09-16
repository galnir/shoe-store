import { config } from "@keystone-6/core";
import { User } from "./src/schemas/User";
import { Product } from "./src/schemas/Product";
import { ProductImage } from "./src/schemas/ProductImage";
import { Context } from ".keystone/types";
import { insertSeedData } from "./seed-data";

export default config({
  db: {
    provider: "mysql",
    idField: { kind: "cuid" },
    url: process.env.DATABASE_URL || "",
    async onConnect(context: Context) {
      if (process.argv.includes("--seed-data")) {
        await insertSeedData(context);
      }
    },
  },
  experimental: {
    generateNextGraphqlAPI: true,
    generateNodeAPI: true,
  },
  lists: { User, Product, ProductImage },
});
