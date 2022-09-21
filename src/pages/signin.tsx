import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { CURRENT_USER_QUERY } from "../components/Header";
import PageLayout from "../components/PageLayout";
import useForm from "../lib/useForm";
import { NextPageWithLayout } from "./_app";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

const SignInPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { data, error, loading } = useQuery(CURRENT_USER_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (data.authenticatedItem) {
    router.push("/account");
  }
  return <SignIn />;
};

const SignIn = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });

  const [signin] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log(inputs);
    await signin();
    resetForm();
  }

  return (
    <div className="flex items-center justify-center">
      <form
        className="flex flex-col gap-5 border p-2"
        method="POST"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl">Sign into your account</h2>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="johndoe@gmail.com"
          className="px-1"
          autoComplete="email"
          value={inputs.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          className="px-1"
          placeholder="Password"
          autoComplete="password"
          value={inputs.password}
          onChange={handleChange}
        />
        <button
          className="bg-red-500 text-white font-bold hover:bg-red-400"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

SignInPage.getLayout = function getLayout(page) {
  return <PageLayout>{page}</PageLayout>;
};

export default SignInPage;
