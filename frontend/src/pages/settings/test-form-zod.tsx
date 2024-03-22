"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useUpdatePasswordMutation } from "@/graphql/mutations/generated/UpdatePassword";

const formSchema = z.object({
  currentPassword: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  newPassword: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function ProfileForm() {
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
    if (values.currentPassword === values.newPassword){
      return toast({
        title: "New password must be different from the current password.",
        description: `On ${formattedDate}`,
      });}
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
                <Input placeholder="current password" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
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
                <Input placeholder="new password" {...field} />
              </FormControl>

              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
