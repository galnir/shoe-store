import { list } from "@keystone-6/core";
import { text, password, relationship } from "@keystone-6/core/fields";

export const User = list({
  // access:
  // ui:
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({ validation: { isRequired: true }, isIndexed: "unique" }),
    password: password(),
    products: relationship({
      ref: "Product.user",
      many: true,
    }),
    // tood add roles, cart and orders
  },
});
