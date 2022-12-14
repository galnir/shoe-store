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
      id
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

const Home: NextPageWithLayout = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="flex flex-wrap justify-center items-center gap-8 py-18">
      {data?.products?.map((product: ProductType) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};

export default Home;
