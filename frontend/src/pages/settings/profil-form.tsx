"use client";

import { useToast } from "@/components/ui/use-toast";
import { useUpdateProfileMutation } from "@/graphql/mutations/generated/UpdateProfile";
import { useProfileQuery } from "@/graphql/queries/generated/GetProfile";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
// import { ProfilInfoTabs } from "./profil-infoTabs";

export default function ProfilForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  // const [errors, setErrors]  useState("")
  const { toast } = useToast();
  const { data: currentUser, client } = useProfileQuery({
    errorPolicy: "ignore",
  });
  const [updateProfile] = useUpdateProfileMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // setError("");
    e.preventDefault();
    
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString("en-EN");

    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    

    // const errors = validatePassword(formJSON.password);
    // if (errors.length > 0) return setError(errors.join("\n"));

    // console.log(currentUser);

    try {
      const res = await updateProfile({ variables: { data: formJSON } });

      toast({
        title: "Your modifications have been saved with success!",
        description: `On ${formattedDate}`,
      });
    } catch (e: any) {
      // console.log(e)
      toast({
        // title: {errors as string},
        title: "An error occurred while saving your modifications.",
        description: `On ${formattedDate}`,
      });
    } finally {
      client.resetStore();
    }
  };

  return (
    <form
      className="h-full flex justify-left items-center"
      onSubmit={handleSubmit}
    >
      {/* <ProfilInfoTabs currentUser={currentUser} /> */}
    </form>
  );
}
