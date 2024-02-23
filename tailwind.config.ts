import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './styles/**/*.{js,ts,jsx,tsx,mdx}',
        './UI/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'first-page': "url('../public/resources/img/contentsimage.png')",
            },
            fontFamily: {
                poor: ['Poor Story', 'poor-story'],
                nanum: ['Nanum Myeongjo', 'nanum-myeongjo'],
            },
        },
    },
    plugins: [],
};
export default config;
