import { ReactElement } from "react";
import PageLayout from "../components/PageLayout";
import { NextPageWithLayout } from "./_app";

const ProductsPage: NextPageWithLayout = () => {
  return (
    <div>
      <h1>Products</h1>
    </div>
  );
};

ProductsPage.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};

export default ProductsPage;
