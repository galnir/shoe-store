import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
//import config from "../../keystone"

const client = new ApolloClient({
  uri:
    process.env.APOLLO_CLIENT_GRAPHQL_URI ||
    "http://localhost:8000/api/graphql",
  cache: new InMemoryCache(),
});

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <ApolloProvider client={client}>
        {getLayout(<Component {...pageProps} />)}
      </ApolloProvider>
    </>
  );
};

export default MyApp;
