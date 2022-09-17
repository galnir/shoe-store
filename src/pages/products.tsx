import { ReactElement } from "react";
import PageLayout from "../components/PageLayout";
import { NextPageWithLayout } from "./_app";
import { useQuery, gql } from "@apollo/client";
import { Product as ProductType } from "@prisma/client";
import Product from "../components/Product";

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsPage: NextPageWithLayout = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      {data?.products?.map((product: ProductType) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

ProductsPage.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};

export default ProductsPage;
