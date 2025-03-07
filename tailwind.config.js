/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            boxShadow: {
                custom: '0px 4px 24px 0px #00000033',
                'top-inset-shadow': '0px -1px 0px 0px #DFE5F1 inset',
                dark: '0px 4px 24px 0px rgba(0, 0, 0, 0.20)',
                tab: '0px 0px 23.1px  0px rgba(0, 0, 0, 0.12)',
                steps: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)'
            },
            screens: {
                xxl: '1920px'
                // => @media (min-width: 992px) { ... }
            },
            colors: {
                primary: '#293991',
                secondary: '#222',
                dimGray: '#4F4F4F',
                superSilver: '#F1F1F1',
                cabaretCharm: '#7D8DA6',
                infinity: '#242A31',
                blueGray: '#7D8DA61A',
                spaceCadet: '#0E2244',
                flapper: '#4D5A66',
                paleGrey: '#F7F7FB',
                pervenche: '#049BE5',
                whisper: '#f7f7f7',
                maritimeBlue: '#25293B',
                uniformGrey: '#A8A8A8',
                industrialAge: '#AFAFAF',
                flannelPajamas: '#8D8F98',
                forcefulOrange: '#F39C12',
                pantone: '#5F6367',
                mainblack: '#222222',
                spandexGreen: '#38B64A',
                shadesOn: '#606060',
                red: '#FF0000',
                whiteSmoke: '#F6F6F6',
                doverGrey: '#848585',
                bluetitmouse: '#4864FF',
                lightgray: '#EAEAEA',
                irongray: '#9F9F9F',
                lightshade: '#F9F9F9',
                verylightgray: '#F2F2F2',
                graywhite: '#FBFBFB',
                brilliantblue: '#0060FF',
                paleblue: '#DFEBFF',
                lightred: '#EB5757',
                lightOverlay: 'rgba(246, 247, 249, 0.60)',
                transparentBlue: '#DAE0FF',
                gainsboro: '#DCDCDC',
                steel: '#7A7A7A'
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif']
            }
        }
    },
    plugins: []
};
