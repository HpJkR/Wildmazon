import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import DrawerCard from "./DrawerCard"

type DetailProduct = {
    id: number,
    title: string,
    description: string,
    price: number,
    picture: string,
}


export default function CardWithForm({ title, description, price, picture, id }: DetailProduct) {

    const [quantity, setQuantity] = useState("1")

    const setIntoBasket = (id: string) => {
        localStorage.setItem(id, quantity)
        console.log(localStorage.getItem(id))
    }

    return (
        <Card className="w-[350px] flex-column justify-center al">
            <CardHeader>
                <img src={picture} alt={title} className="rounded" />
            </CardHeader>
            <CardContent>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
                <CardTitle className="flex justify-end">{price} €</CardTitle>
            </CardContent>
            <CardFooter className="flex justify-between gap-x-4">
                <Input type='number' defaultValue="1" className="text-end" onChange={(e) => setQuantity(e.target.value)} />
                <Button onClick={() => setIntoBasket(id.toString())}>Ajouter au panier</Button>
            </CardFooter>
            <DrawerCard />
        </Card>
    )
}