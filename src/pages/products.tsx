import { ReactElement } from "react";
import PageLayout from "../components/PageLayout";
import { NextPageWithLayout } from "./_app";
import { InferGetStaticPropsType } from "next";
import Product from "../components/Product";
import { query } from ".keystone/api";

export type ProductType = {
  id: string;
  name: string;
  price: number;
  description: string;
  photo: {
    image: {
      publicUrlTransformed: string;
    };
  };
};

// @ts-ignore
const ProductsPage: NextPageWithLayout = ({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-8 py-18">
      {products?.map((product: ProductType) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export async function getStaticProps() {
  const products = (await query.Product.findMany({
    query: "id name description price",
  })) as ProductType[];

  return {
    props: {
      products,
    },
  };
}

ProductsPage.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};

export default ProductsPage;
