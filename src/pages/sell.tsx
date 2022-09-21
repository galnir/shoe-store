import { ReactElement } from "react";
import CreateProduct from "../components/CreateProduct";
import PageLayout from "../components/PageLayout";
import { NextPageWithLayout } from "./_app";
import { CURRENT_USER_QUERY } from "../components/Header";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const SellPage: NextPageWithLayout = () => {
  const router = useRouter();

  const { data, error, loading } = useQuery(CURRENT_USER_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data.authenticatedItem || !data.authenticatedItem.id) {
    router.push("/signin");
  }

  return <CreateProduct />;
};

SellPage.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};

export default SellPage;
