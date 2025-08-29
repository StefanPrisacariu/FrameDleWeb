import localFont from 'next/font/local';

export const useLocalFonts = () => {
    return {
        // fonts: {},
        // variables: [],
        // fonts: { icons, unifySans, helveticaNeue },
        fonts: { icons, georgia, unifySans, helveticaNeue },
        variables: [icons.variable, georgia.variable, unifySans.variable, helveticaNeue.variable],
        // variables: [georgia.variable, unifySans.variable, helveticaNeue.variable],
    };
};

const icons = localFont({
    weight: '400',
    style: 'normal',
    display: 'swap',
    variable: '--icons',
    adjustFontFallback: false,
    src: '../../assets/fonts/Icons/Icons.woff2',
});

const georgia = localFont({
    display: 'swap',
    variable: '--georgia',
    adjustFontFallback: false,
    fallback: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Noto Sans',
        'Helvetica',
        'Arial',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
    ],
    src: [
        {
            weight: '400',
            style: 'normal',
            path: '../../assets/fonts/Georgia/Georgia.woff2',
        },
        {
            weight: '400',
            style: 'italic',
            path: '../../assets/fonts/Georgia/Georgia-Italic.woff2',
        },
        {
            weight: '700',
            style: 'italic',
            path: '../../assets/fonts/Georgia/Georgia-BoldItalic.woff2',
        },
    ],
});

const helveticaNeue = localFont({
    display: 'swap',
    adjustFontFallback: false,
    variable: '--helvetica-neue',
    fallback: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Noto Sans',
        'Helvetica',
        'Arial',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
    ],
    src: [
        {
            weight: '400',
            style: 'normal',
            path: '../../assets/fonts/HelveticaNeue/HelveticaNeue.woff2',
        },
        {
            weight: '700',
            style: 'normal',
            path: '../../assets/fonts/HelveticaNeue/HelveticaNeue-Bold.woff2',
        },
    ],
});

const unifySans = localFont({
    display: 'swap',
    variable: '--unify-sans',
    adjustFontFallback: false,
    fallback: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Noto Sans',
        'Helvetica',
        'Arial',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
    ],
    src: [
        {
            weight: '400',
            style: 'normal',
            path: '../../assets/fonts/UnifySans/UnifySans-Regular.woff2',
        },
        {
            weight: '600',
            style: 'normal',
            path: '../../assets/fonts/UnifySans/UnifySans-SemiBold.woff2',
        },
        { weight: '700', style: 'normal', path: '../../assets/fonts/UnifySans/UnifySans-Bold.woff2' },
    ],
});
