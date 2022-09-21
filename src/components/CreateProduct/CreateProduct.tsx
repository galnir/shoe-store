import React from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import useForm from "../../lib/useForm";

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

const CreateProduct = () => {
  const router = useRouter();
  const { inputs, handleChange, clearForm } = useForm({
    image: "",
    name: "",
    price: 0,
    description: "",
  });

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  async function handleSubmit(e: any) {
    e.preventDefault();
    const response = await createProduct();
    clearForm();

    router.push(`/product/${response.data.createProduct.id}`);
  }

  return (
    <div className="flex items-center justify-center">
      <form className="flex flex-col gap-5 border p-2" onSubmit={handleSubmit}>
        <label htmlFor="image">Image</label>
        <input
          required
          type="file"
          id="image"
          name="image"
          onChange={handleChange}
        />
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          className="p-1 text-black placeholder:text-gray-500"
          name="name"
          placeholder="Name"
          value={inputs.name}
          onChange={handleChange}
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          className="p-1 text-black placeholder:text-gray-500"
          name="price"
          min={0}
          value={inputs.price}
          placeholder="Price"
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          className="p-1 text-black placeholder:text-gray-500"
          name="description"
          value={inputs.description}
          placeholder="Enter A Description"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-red-600 text-white font-bold hover:bg-red-500"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
