import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { CURRENT_USER_QUERY } from "../Header";

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

const SignOutButton = () => {
  const router = useRouter();

  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    onCompleted: () => {
      router.push("/");
    },
  });

  return (
    <button
      type="button"
      onClick={() => signout()}
      className="w-fit p-2 bg-red-500 text-white hover:bg-red-400 rounded-sm"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
