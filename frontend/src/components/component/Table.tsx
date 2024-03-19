import React from 'react';
import PropTypes from 'prop-types';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { XMarkIcon } from "@heroicons/react/24/outline";

function TableComponent({ products, loading, error, onDeleteProduct, onRefetch }: { products: any[], loading: boolean, error: any, onDeleteProduct: (id: string) => Promise<void>, onRefetch: () => void }) {
    const deleteProductFromTable = async (id: React.Key | null | undefined) => {
        try {
            await onDeleteProduct(id as string); // Cast 'id' to 'string'
            onRefetch();
        } catch (error) {
            console.error(error);
        }
    };

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
                {loading ? (
                    <TableRow>
                        <TableCell colSpan={5}>Chargement en cours...</TableCell>
                    </TableRow>
                ) : error ? (
                    <TableRow>
                        <TableCell colSpan={5}>Erreur : {error.message}</TableCell>
                    </TableRow>
                ) : products.map((product: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; price: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; picture: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) => (
                    <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.picture}</TableCell>
                        <TableCell className="text-right" onClick={() => deleteProductFromTable(product.id)}>
                            <button>
                                <XMarkIcon width={24} height={24} className="text-red-700" />
                            </button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

TableComponent.propTypes = {
    products: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    onDeleteProduct: PropTypes.func.isRequired,
    onRefetch: PropTypes.func.isRequired,
};

export default TableComponent;
