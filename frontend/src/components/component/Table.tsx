import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useProductsQuery, useDeleteProductMutation } from '@/graphql/generated/schema'
import { XMarkIcon } from "@heroicons/react/24/outline"

export default function TableComponent() {
    const { data, loading, error, refetch } = useProductsQuery();
    const [deleteProduct] = useDeleteProductMutation()

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const products = data ? data.products : [];

    const deleteProductFromTable = async (id: number) => {
        try {
            await deleteProduct({ variables: { deleteProductId: id } })
            refetch();
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Table className="border rounded-md">
            <TableCaption>Liste des produits</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Nom du produit</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Supprimer</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product) => (
                    <TableRow key={product.id} >
                        <TableCell className="font-medium" >{product.name}</TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.picture}</TableCell>
                        <TableCell className="text-right" onClick={() => deleteProductFromTable(parseInt(product.id))}>
                            <button>
                                <XMarkIcon width={24} height={24} className="text-red-700" />
                            </button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
