import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import DrawerCard from "./DrawerCard";

type DetailProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  picture: string;
};

export default function CardWithForm({
  title,
  description,
  price,
  picture,
  id,
}: DetailProduct) {
  const [quantity, setQuantity] = useState("1");
  const [selectedQuantity, setSelectedQuantity] = useState("");

  const setIntoBasket = (id: string) => {
    localStorage.setItem(id, selectedQuantity || quantity);
    console.log(localStorage.getItem(id));
  };

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
        <DrawerCard
          setQuantity={setQuantity}
          setSelectedQuantity={setSelectedQuantity}
        />
        {selectedQuantity && (
          <div className="bg-white text-gray-700 p-2 rounded">
            {selectedQuantity}
          </div>
        )}
        <Button onClick={() => setIntoBasket(id.toString())}>
          Add to basket
        </Button>
      </CardFooter>
    </Card>
  );
}
