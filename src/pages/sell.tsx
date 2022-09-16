import { ReactElement } from "react";
import PageLayout from "../components/PageLayout";
import { NextPageWithLayout } from "./_app";

const SellPage: NextPageWithLayout = () => {
  return (
    <div>
      <h1>Sell</h1>
    </div>
  );
};

SellPage.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};

export default SellPage;
