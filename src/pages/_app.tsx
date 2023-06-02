import { api } from "~/utils/api";
import "~/styles/globals.css";

import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Layout } from "~/components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>Twootr</title>
        <meta name="description" content="Speak your mind on twootr. 💬" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <SignedIn>
          <>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </>
        </SignedIn>
        <SignedOut>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SignedOut>
      </>
    </ClerkProvider>
  );
}

export default api.withTRPC(MyApp);
