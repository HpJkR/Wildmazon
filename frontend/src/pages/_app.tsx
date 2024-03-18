import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/client";



function App({ Component, pageProps }: AppProps) {
    return (
        <div className="p-8 min-h-screen">
            <ApolloProvider client={client}>
                <Component {...pageProps} />
            </ApolloProvider>
        </div>
    );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
