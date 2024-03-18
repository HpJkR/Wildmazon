import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useProductsQuery } from '@/graphql/generated/schema'
import { XMarkIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"

export default function TableBasket() {
    const { data, loading, error } = useProductsQuery();
    const [basketProducts, setBasketProducts] = useState<any[]>([])

    useEffect(() => {
        if (data && data.products) {
            const uniqueProducts = data.products.filter(product => localStorage.getItem(product.id));
            setBasketProducts(uniqueProducts);
        }
    }, [data]);

    const removeFromBasket = async (id: string) => {
        try {
            await localStorage.removeItem(id);
            setBasketProducts(basketProducts.filter(product => product.id !== id));
        } catch (error) {
            console.error(error);
        }
    }

    if (loading) return <p>Chargement en cours...</p>;
    if (error) return <p>Erreur : {error.message}</p>;

    return (
        <>
            {basketProducts.length === 0 ? (
                <p>Votre panier est vide.</p>
            ) : (
                <Table className="border rounded-md">
                    <TableCaption>Liste des produits</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Produit</TableHead>
                            <TableHead>Prix</TableHead>
                            <TableHead>Qté</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {basketProducts.map((product: any) => (
                            <TableRow key={product.id} >
                                <TableCell>
                                    <img src={product.picture} alt={product.name} />
                                </TableCell>
                                <TableCell className="font-medium" >{product.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{localStorage.getItem(product.id)}</TableCell>
                                <TableCell className="text-right" onClick={() => removeFromBasket(product.id)}>
                                    <button>
                                        <XMarkIcon width={24} height={24} className="text-red-700" />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </>
    )
}
