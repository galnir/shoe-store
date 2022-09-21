import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import Logo from "../Logo";

export const CURRENT_USER_QUERY = gql`
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

const Header = () => {
  const { data, error, loading } = useQuery(CURRENT_USER_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-6 flex items-center justify-between border-b-[10px] border-gray-400">
      <div>
        <Logo />
      </div>
      <ul className="text-3xl font-bold uppercase flex gap-10">
        <Link href="/products">Products</Link>
        {data.authenticatedItem && data.authenticatedItem.id ? (
          <>
            <Link href="/sell">Sell</Link>
            <Link href="/orders">Orders</Link>
            <Link href="/account">Account</Link>
          </>
        ) : (
          <Link href="/signin">Sign In</Link>
        )}
      </ul>
    </div>
  );
};

export default Header;
