"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { PasswordInput } from "@/components/component/PasswordInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { useUpdatePasswordMutation } from "@/graphql/mutations/generated/UpdatePassword";
import { useState } from "react";

const formSchema = z.object({
  currentPassword: z.string().min(8, {
    message: "Current password must be at least 8 characters long.",
  }),
  newPassword: z
    .string()
    .min(8, {
      message: "New password must be at least 8 characters long.",
    })
    .regex(/^(?=.*[a-z])/, {
      message: "New password must contain at least one lowercase letter.",
    })
    .regex(/^(?=.*[A-Z])/, {
      message: "New password must contain at least one uppercase letter.",
    })
    .regex(/^(?=.*\d)/, {
      message: "New password must contain at least one digit.",
    })
    .regex(/^(?=.*[@$!%*?&])/, {
      message: "New password must contain at least one special character.",
    }),
});

export default function ProfileForm() {
  const [passwordErrors, setPasswordErrors] = useState<{
    [key: string]: string[];
  }>({
    currentPassword: [],
    newPassword: [],
  });

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString("en-EN");
  const [updatePassword] = useUpdatePasswordMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.currentPassword === values.newPassword) {
      return toast({
        title: "New password must be different from the current password.",
        description: `On ${formattedDate}`,
      });
    }
    try {
      const data = await updatePassword({
        variables: { data: { password: values.newPassword } },
      });
      console.log("Password updated with success", data);
      toast({
        title: "Password updated with success",
        description: `On ${formattedDate}`,
      });
    } catch (error: any) {
      console.error("An error occured, please try again", error.message);
      toast({
        title: "An error occured, please try again",
        description: `On ${formattedDate}`,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Current password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="New password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
