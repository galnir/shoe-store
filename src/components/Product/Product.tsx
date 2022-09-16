import { Product } from "@prisma/client";

const Product = ({ product }: { product: Product }) => {
  console.log("product is", product);
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
    </div>
  );
};

export default Product;
