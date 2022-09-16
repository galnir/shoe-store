import { ReactElement } from "react";
import PageLayout from "../components/PageLayout";
import { NextPageWithLayout } from "./_app";

const OrdersPage: NextPageWithLayout = () => {
  return (
    <div>
      <h1>Orders</h1>
    </div>
  );
};

OrdersPage.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};

export default OrdersPage;
