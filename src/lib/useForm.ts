import { useEffect, useState } from "react";

export default function useForm(
  initial = {
    name: "",
    price: 0,
    description: "",
    image: "",
  }
) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join("");

  useEffect(() => {
    setInputs(initial);
  }, [initialValues]);

  function handleChange(e: any) {
    let { value, name, type } = e.target;
    if (type === "number") {
      value = parseInt(value);
    }
    if (type === "file") {
      [value] = e.target.files;
    }
    setInputs({
      // copy the existing state
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    // const blankState = Object.fromEntries(
    //   Object.entries(inputs).map(([key, value]) => [key, ""])
    // );
    setInputs({
      name: "",
      price: 0,
      description: "",
      image: "",
    });
  }

  // return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}