import Head from "next/head";
import React from "react";
import Header from "../Header";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Head>
        <title>Abibas</title>
        <meta name="description" content="Abibas, the best online shoe store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="p-8 my-0 mx-auto">{children}</div>
    </div>
  );
};

export default PageLayout;
