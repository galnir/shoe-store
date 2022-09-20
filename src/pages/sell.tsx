import { ReactElement } from "react";
import CreateProduct from "../components/CreateProduct";
import PageLayout from "../components/PageLayout";
import { NextPageWithLayout } from "./_app";

const SellPage: NextPageWithLayout = () => {
  return (
    <div>
      <CreateProduct />
    </div>
  );
};

SellPage.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};

export default SellPage;
