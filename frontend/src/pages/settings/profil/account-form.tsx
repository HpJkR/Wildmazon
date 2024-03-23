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
import { useUpdateProfileMutation } from "@/graphql/mutations/generated/UpdateProfile";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Current password must be at least 8 characters long.",
  }),
});

export default function AccountForm() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString("en-EN");
  const [username] = useUpdateProfileMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const data = await username({
        variables: { data: { nickname: values.username } },
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Current password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save changes</Button>
      </form>
    </Form>
  );
}
