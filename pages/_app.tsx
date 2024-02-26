import '/styles/styles.ts';
import '/styles/globals.css';
import '/public/resources/constants/text';
import { RecoilRoot } from 'recoil';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <RecoilRoot>
                <Component {...pageProps} />
            </RecoilRoot>
        </>
    );
}
