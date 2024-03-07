import '/styles/styles.ts';
import '/styles/globals.css';
import '/public/resources/constants/text';

import { RecoilRoot } from 'recoil';

import type { AppProps } from 'next/app';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <RecoilRoot>
                <Component {...pageProps} />
            </RecoilRoot>
        </>
    );
}
