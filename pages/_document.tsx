import { Html, Head, Main, NextScript } from 'next/document';
import { body } from '@/styles/styles';
export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Poor+Story&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo&display=swap" rel="stylesheet" />
            </Head>
            <body className={body}>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
