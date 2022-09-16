import { products } from "./data";
import { Context } from ".keystone/types";

export async function insertSeedData(context: Context) {
  console.log(`🌱 Inserting seed data`);

  const createProduct = async (productData: any) => {
    const product = await context.db.Product.createOne({
      data: {
        name: productData.name,
        description: productData.description,
        status: productData.status,
        price: productData.price,
        photo: {
          create: productData.photo,
        },
      },
    });
    return product;
  };

  for (const product of products) {
    const createdProduct = await createProduct(product);
    console.log(`🌱 Created Product: ${createdProduct.name}`);
  }

  console.log(`✅ Seed data inserted`);
  console.log(`👋 Please start the process with \`yarn dev\``);
  process.exit();
}
