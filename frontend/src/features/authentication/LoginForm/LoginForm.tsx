"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useLoginMutation, useProfileQuery } from "@/graphql/generated/schema";
import { FormEvent, useState } from "react";

export default function LoginForm({ handleSignUpAccount }: { handleSignUpAccount: () => void }) {
  const [error, setError] = useState("");
  const [login] = useLoginMutation();
  const { toast } = useToast();
  const { data: currentUser, client } = useProfileQuery({
    errorPolicy: "ignore",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setError("");
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString("en-EN");
    
    try {
      const res = await login({ variables: { data: formJSON } });
      
      toast({
        title: "Logged in with success",
        description: `On ${formattedDate}`,
      });
    } catch (e: any) {
      toast({
        title: "An error occurred while connecting",
        description: `On ${formattedDate}`,
      });
    } 
    finally {
      client.resetStore()
    }
  };

  return (
    <form
      className="h-full flex justify-center items-center"
      onSubmit={handleSubmit}
    >
      <Card className=" w-96">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Connection</CardTitle>
          <CardDescription>Connect to your account</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
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
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              required
              className="input input-bordered w-full"
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button className="w-full">Connection</Button>
          <Button
            className="w-full"
            variant="secondary"
            onClick={handleSignUpAccount}
          >
            Don&apos;t have an account?{" "}
            <span className="ml-1 underline">Sign up</span>
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
