import Link from "next/link";
import { gql } from "@apollo/client";
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
  return (
    <div className="p-6 flex items-center justify-between border-b-[10px] border-gray-400">
      <div>
        <Logo />
      </div>
      <ul className="text-3xl font-bold uppercase flex gap-10">
        <Link href="/products">Products</Link>
        <Link href="/sell">Sell</Link>
        <Link href="/orders">Orders</Link>
        <Link href="/account">Account</Link>
      </ul>
    </div>
  );
};

export default Header;
