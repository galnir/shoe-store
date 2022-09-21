import { useRouter } from "next/router";
import { GetStaticPathsResult, GetStaticPropsContext } from "next";
import { query } from ".keystone/api";
import { ReactElement } from "react";
import PageLayout from "../../components/PageLayout";
import { NextPageWithLayout } from "../_app";
import Image from "next/image";
import type { ProductType } from "../products";

// @ts-ignore
const ProductPage: NextPageWithLayout = ({
  product,
}: {
  product: ProductType;
}) => {
  const { query } = useRouter();
  const { id } = query;

  if (!id || typeof id !== "string") {
    return <div>Invalid product id</div>;
  }

  return (
    <div className="flex gap-14">
      <div>
        <Image
          src={product?.photo?.image?.publicUrlTransformed}
          height={400}
          width={400}
          objectFit="cover"
        />
      </div>
      <div className="font-bold">
        <h1 className="text-3xl">{product?.name}</h1>
        <p className="text-xl">{product?.description}</p>
      </div>
    </div>
  );
};

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const products = (await query.Product.findMany({
    query: "id",
  })) as { id: string }[];

  return {
    paths: products.map((product) => ({
      params: { id: product.id },
    })),
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ id: string }>) {
  const product = (await query.Product.findOne({
    where: { id: params?.id },
    query:
      "id name description price photo { id image { publicUrlTransformed } }",
  })) as ProductType | null;

  return {
    props: {
      product,
    },
  };
}

ProductPage.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};

export default ProductPage;
