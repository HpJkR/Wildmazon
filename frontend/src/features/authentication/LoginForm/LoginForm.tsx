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
import { useSignupMutation } from "@/graphql/generated/schema";
import { FormEvent, useState } from "react";
import Layout from "../../../components/layout";

function validatePassword(p: string) {
  let errors = [];
  if (p.length < 8)
    errors.push("Le mot de passe doit faire minimum 8 caractères");
  if (p.search(/[a-z]/) < 0)
    errors.push("Le mot de passe doit contenir une minuscule");
  if (p.search(/[A-Z]/) < 0)
    errors.push("Le mot de passe doit contenir une majuscule");
  if (p.search(/[0-9]/) < 0)
    errors.push("Le mot de passe doit contenir un chiffre");

  return errors;
}

export default function LoginForm(handleSubmit : {handleSubmit: FormEvent<HTMLFormElement>}) {
  const [error, setError] = useState("");
  const [createUser] = useSignupMutation();
  const { toast } = useToast();


  return (
    <Layout pageTitle="Create an account">
      <form
        className="h-full flex justify-center items-center"
        onSubmit={handleSubmit}
      >
        <Card className=" w-96">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Connection</CardTitle>
            <CardDescription>
              Connect to your account
            </CardDescription>
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
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                required
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="passwordConfirmation">Confirmation</Label>
              <Input
                type="password"
                name="passwordConfirmation"
                id="passwordConfirmation"
                required
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Create account</Button>
          </CardFooter>
        </Card>
      </form>
    </Layout>
  )
}