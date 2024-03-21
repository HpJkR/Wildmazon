"use client";

import { Form } from "@/components/component/Form";
import { useToast } from "@/components/ui/use-toast";
import { useSignupMutation } from "@/graphql/mutations/generated/Signup";
import { FormEvent } from "react";
import HomePage from "../features/home/HomePage";
// import { Form } from "@/components/ui/form";

export default function Index() {
  const [createUser] = useSignupMutation();
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // setError("");

    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString("en-EN");
    // Ne pas envoyer la confirmation puisqu'elle est vérifiée côté client
    delete formJSON.confirmPassword;

    try {
      const res = await createUser({ variables: { newUserData: formJSON } });

      toast({
        title: "Your modifications have been saved with success!",
        description: `On ${formattedDate}`,
      });
    } catch (e: any) {
      console.log(e);
      toast({
        // title: {errors as string},
        title: "An error occurred while saving your modifications.",
        description: `On ${formattedDate}`,
      });
    }
    // finally {
    //   client.resetStore();
    // }
  };

  const ToggleCard = () => {
    console.log("toggle");
  };

  const inputObjData = {
    title: "Create your account",
    description: "Description",
    inputs: [
      {
        type: "email",
        name: "email",
        label: "Email Address",
      },
      {
        type: "text",
        name: "nickname",
        label: "Pseudo",
      },
      {
        type: "password",
        name: "password",
        label: "Password",
      },
      {
        type: "password",
        name: "confirmPassword",
        label: "Confirm your Password",
      },
    ],
    buttons: [
      {
        text: "Sign up",
        click: handleSubmit,
      },
      // {
      //   text: "Create an account",
      //   click: ToggleCard,
      // },
    ],
  };

  return (
    <>
      <HomePage />
      <Form inputObj={inputObjData} />
    </>
  );
}
