import React from "react";
import Header from "../Header";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="p-8 my-0 mx-auto">{children}</div>
    </div>
  );
};

export default PageLayout;
