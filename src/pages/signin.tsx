import { gql, useMutation } from "@apollo/client";
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
  return <SignIn />;
};

const SignIn = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });

  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
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
    <form method="POST" onSubmit={handleSubmit}>
      <h2>Sign into your account</h2>
      <label htmlFor="email">
        Email
        <input
          type="email"
          name="email"
          placeholder="johndoe@gmail.com"
          autoComplete="email"
          value={inputs.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="password"
          value={inputs.password}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Sign In</button>
    </form>
  );
};

SignInPage.getLayout = function getLayout(page) {
  return <PageLayout>{page}</PageLayout>;
};

export default SignInPage;
