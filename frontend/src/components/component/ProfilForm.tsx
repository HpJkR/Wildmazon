import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useCreateProductMutation, useProductsQuery } from '@/graphql/generated/schema';
import { useState } from 'react';

const formSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(50),
    prix: z.string().min(1).max(50),
    image: z.string().min(2).max(500),

})

export default function ProfileForm() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            prix: "",
            image: "",
        },
    })

    const { refetch } = useProductsQuery();
    const [createProduct] = useCreateProductMutation();
    const [previousData, setPreviousData] = useState<any>(null);

    const refetchIfNeeded = async () => {
        const { data } = await refetch();
        if (data && JSON.stringify(data) !== JSON.stringify(previousData)) {
            setPreviousData(data);
        }
        return { refetchIfNeeded };
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await createProduct({
                variables: {
                    data: {
                        name: values.name,
                        description: values.description,
                        price: parseInt(values.prix),
                        picture: values.image
                    }
                },
                onCompleted: async () => {
                    await refetchIfNeeded();
                }
            });

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-96 border p-2 rounded-md">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className='mt-5'>
                            <FormLabel>Nom du produit</FormLabel>
                            <FormControl>
                                <Input placeholder="Nom du produit..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className=''>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Description..." {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="prix"
                    render={({ field }) => (
                        <FormItem className=''>
                            <FormLabel>Prix</FormLabel>
                            <FormControl>
                                <Input placeholder="Prix..." type='number' {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem className=''>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <Input placeholder="Lien de l'image..." {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className='bg-black text-white'>Submit</Button>
            </form>
        </Form>
    )
};