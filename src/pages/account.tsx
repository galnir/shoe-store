import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import PageLayout from "../components/PageLayout";
import SignOutButton from "../components/SignOutButton";
import { NextPageWithLayout } from "./_app";

const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
      }
    }
  }
`;

const AccountPage: NextPageWithLayout = () => {
  return <Account />;
};

const Account = () => {
  const router = useRouter();
  const { data, error, loading } = useQuery(CURRENT_USER_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data.authenticatedItem || !data.authenticatedItem.id) {
    router.push("/signin");
    return <></>;
  }

  return (
    <div className="flex flex-col gap-5 text-xl">
      <h1 className="text-3xl">Account</h1>
      <h2>{data.authenticatedItem.name}</h2>
      <h2>{data.authenticatedItem.email}</h2>
      <SignOutButton />
    </div>
  );
};

AccountPage.getLayout = function getLayout(page: ReactElement) {
  return <PageLayout>{page}</PageLayout>;
};

export default AccountPage;
