"use client";

import { useToast } from "@/components/ui/use-toast";
import { useUpdateProfileMutation } from "@/graphql/mutations/generated/UpdateProfile";
import { useProfileQuery } from "@/graphql/queries/generated/GetProfile";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Form from "@/components/component/Form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProfilForm() {
  const router = useRouter();
  const [error, setError] = useState("");
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
    <Form
      className="h-full flex justify-left items-center"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-2">
        <Label htmlFor="username" className="mt-4">
          Username
        </Label>
        <Input
          required
          type="text"
          name="username"
          id="username"
          autoComplete=""
          className="input input-bordered w-full"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email" className="mt-4">
          Email
        </Label>
        <Input
          required
          type="email"
          name="email"
          id="email"
          autoComplete=""
          className="input input-bordered w-full"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password" className="mt-4">
          Password
        </Label>
        <Input
          required
          type="password"
          name="password"
          id="password"
          autoComplete=""
          className="input input-bordered w-full"
        />
      </div>
      <Button className="w-full mt-4">Save</Button>
    </Form>
  );
}
