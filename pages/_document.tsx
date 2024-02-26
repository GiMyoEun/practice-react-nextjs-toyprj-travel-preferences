import { Html, Head, Main, NextScript } from 'next/document';
import { body } from '@/styles/styles';
import { RecoilRoot } from 'recoil';
import AlertContextProvider from '@/public/resources/store/AlertContext';
export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Poor+Story&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo&display=swap" rel="stylesheet" />
            </Head>

            <body className={body}>
                <div id="modal"></div>
                <Main />

                <NextScript />
            </body>
        </Html>
    );
}
