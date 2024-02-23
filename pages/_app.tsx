import '/styles/styles.ts';
import '/styles/globals.css';
import '/public/resources/constants/text';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
        </>
    );
}
