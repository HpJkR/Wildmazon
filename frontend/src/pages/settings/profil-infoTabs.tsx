// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { ProfileQuery } from "@/graphql/queries/generated/GetProfile";

// export function ProfilInfoTabs(props: {
//   currentUser: ProfileQuery | undefined;

//   const router = useRouter();
//   const [error, setError] = useState("");
//   // const [errors, setErrors]  useState("")
//   const { toast } = useToast();
//   const { data: currentUser, client } = useProfileQuery({
//     errorPolicy: "ignore",
//   });
//   const [updateProfile] = useUpdateProfileMutation();

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     // setError("");

//     e.preventDefault();

//     const formData = new FormData(e.target as HTMLFormElement);
//     const formJSON: any = Object.fromEntries(formData.entries());

//     const currentDate = new Date();
//     const formattedDate = currentDate.toLocaleString("en-EN");
    

//     // const errors = validatePassword(formJSON.password);
//     // if (errors.length > 0) return setError(errors.join("\n"));

//     console.log(currentUser);

//     try {
//       const res = await updateProfile({ variables: { data: formJSON } });

//       toast({
//         title: "Your modifications have been saved with success!",
//         description: `On ${formattedDate}`,
//       });
//     } catch (e: any) {
//       // console.log(e)
//       toast({
//         // title: {errors as string},
//         title: "An error occurred while saving your modifications.",
//         description: `On ${formattedDate}`,
//       });
//     } finally {
//       client.resetStore();
//     }
//   };



// }) {
//   return (
//     <form
//     className="h-full flex justify-left items-center"
//     onSubmit={handleSubmit}
//   >
//     <Tabs defaultValue="account" className="w-[400px]">
//       <TabsList className="grid w-full grid-cols-2">
//         <TabsTrigger value="account">Account</TabsTrigger>
//         <TabsTrigger value="password">Password</TabsTrigger>
//       </TabsList>
//       <TabsContent value="account">
//         <Card>
//           <CardHeader>
//             <CardTitle>Account</CardTitle>
//             <CardDescription>
//               Make changes to your account here. Click save when you&apos;re
//               done.
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             <div className="space-y-1">
//               <Label htmlFor="nickname">Pseudo</Label>
//               <Input
//                 id="nickname"
//                 defaultValue={props.currentUser?.profile.nickname}
//                 name="nickname"
//               />
//             </div>
//             <div className="space-y-1">
//               <Label htmlFor="avatar">Avatar</Label>
//               <Input
//                 id="avatar"
//                 defaultValue={props.currentUser?.profile.avatar}
//                 name="avatar"
//                 type="url"
//               />
//             </div>
//           </CardContent>
//           <CardFooter>
//             <Button type="submit">Save changes</Button>
//           </CardFooter>
//         </Card>
//       </TabsContent>
//       <TabsContent value="password">
//         <Card>
//           <CardHeader>
//             <CardTitle>Password</CardTitle>
//             <CardDescription>
//               Change your password here. After saving, you&apos;ll be logged
//               out.
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             <div className="space-y-1">
//               <Label htmlFor="current">Current password</Label>
//               <Input id="current" type="password" />
//             </div>
//             <div className="space-y-1">
//               <Label htmlFor="password">New password</Label>
//               <Input id="password" type="password" name="password" />
//             </div>
//           </CardContent>
//           <CardFooter>
//             <Button>Save password</Button>
//           </CardFooter>
//         </Card>
//       </TabsContent>
//     </Tabs>
//     </form>
//   );
// }
