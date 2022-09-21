import "dotenv/config";
import { config } from "@keystone-6/core";
import { User } from "./src/schemas/User";
import { Product } from "./src/schemas/Product";
import { ProductImage } from "./src/schemas/ProductImage";
//import { Context } from ".keystone/types";
//import { insertSeedData } from "./seed-data";
import { statelessSessions } from "@keystone-6/core/session";
import { createAuth } from "@keystone-6/auth";
import { insertSeedData } from "./seed-data";
import { KeystoneContext } from "@keystone-6/core/types";

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  sessionData: "id name email",
  initFirstItem: {
    fields: ["name", "email", "password"],
  },
  // passwordResetLink: {
  //   async sendToken(args) {
  //     // send the email
  //     await sendPasswordResetEmail(args.token, args.identity);
  //   },
  // },
});

const session = statelessSessions({
  maxAge: 60 * 60 * 24 * 360,
  secret: process.env.COOKIE_SECRET || "supersecretblahblah",
});

export default withAuth(
  config({
    db: {
      provider: "mysql",
      url: process.env.DATABASE_URL || "",
      async onConnect(context: KeystoneContext) {
        if (process.argv.includes("--seed-data")) {
          await insertSeedData(context);
        }
      },
    },
    experimental: {
      generateNextGraphqlAPI: true,
      generateNodeAPI: true,
    },
    server: {
      cors: {
        origin: ["http://localhost:3000"],
        credentials: true,
      },
    },
    ui: {
      isAccessAllowed: ({ session }) => !!session?.data,
    },
    lists: { User, Product, ProductImage },
    session,
  })
);
