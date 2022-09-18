import { useRouter } from "next/router";
import { ReactElement } from "react";
import PageLayout from "../../components/PageLayout";
import { NextPageWithLayout } from "../_app";
import { useQuery, gql } from "@apollo/client";
import Image from "next/image";

const PRODUCT_QUERY = gql`
  query GetProduct($id: ID!) {
    product(where: { id: $id }) {
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

const ProductContent: React.FC<{ id: string }> = ({ id }) => {
  const { loading, error, data } = useQuery(PRODUCT_QUERY, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="flex gap-14">
      <div>
        <Image
          src={data?.product?.photo?.image?.publicUrlTransformed}
          height={400}
          width={400}
          objectFit="cover"
        />
      </div>
      <div className="font-bold">
        <h1 className="text-3xl">{data?.product?.name}</h1>
        <p className="text-xl">{data?.product?.description}</p>
      </div>
    </div>
  );
};

const ProductPage: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { id } = query;

  if (!id || typeof id !== "string") {
    return <div>Invalid product id</div>;
  }

  return <ProductContent id={id} />;
};

ProductPage.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};

export default ProductPage;
