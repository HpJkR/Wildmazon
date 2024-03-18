import Layout from '../components/layout';
import React from 'react';
import CardWithForm from '@/components/component/Card';
import { useProductsQuery } from '@/graphql/generated/schema'


export default function Home() {
    const { data, loading, error, refetch } = useProductsQuery();
    const products = data ? data.products : [];
    return (
        <Layout pageTitle='Wildmazon'>
            <h1 className="my-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Welcome to Wildmazon
            </h1>
            <div className='flex justify-center gap-4'>
                {products.map((p) => (
                    <CardWithForm
                        key={p.id}
                        title={p.name}
                        description={p.description}
                        price={p.price}
                        picture={p.picture} 
                        id={parseInt(p.id)}
                        // SetIntoBasket={localStorage.setItem(p.id,2)}
                    />
                ))}
            </div>
        </Layout>
    )

} 