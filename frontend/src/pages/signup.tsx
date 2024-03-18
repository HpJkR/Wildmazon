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
import Layout from "../components/layout";

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

export default function Signup() {
  const [error, setError] = useState("");
  const [createUser] = useSignupMutation();
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log("")
    setError("");
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());

    const errors = validatePassword(formJSON.password);
    if (errors.length > 0) return setError(errors.join("\n"));
    if (formJSON.password !== formJSON.passwordConfirmation)
      return setError("les mots de passe ne correspondent pas");

    // do not send confirmation since it's checked on the frontend
    delete formJSON.passwordConfirmation;

    try {
      const res = await createUser({ variables: { newUserData: formJSON } });
      console.log({ res });
      toast({
        title: "Compte créé avec succès",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
    } catch (e: any) {
      if (e.message === "EMAIL_ALREADY_TAKEN")
        setError("Cet e-mail est déjà pris");
      else setError("une erreur est survenue");
      toast({
        title: "Erreur dans la création de votre compte",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
    }
  };

  return (
    <Layout pageTitle="Create an account">
      <form
        className="h-full flex justify-center items-center"
        onSubmit={handleSubmit}
      >
        <Card className=" w-96">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your email below to create your account
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
              <Label htmlFor="nickname">Pseudo</Label>
              <Input
                type="text"
                name="nickname"
                id="nickname"
                minLength={2}
                maxLength={30}
                required
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
          </CardContent>
          <CardFooter>
            <Button className="w-full">Create account</Button>
          </CardFooter>
        </Card>
      </form>
    </Layout>
  );
}
