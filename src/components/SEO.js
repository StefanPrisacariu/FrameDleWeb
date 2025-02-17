import { Helmet } from 'react-helmet';

const SEO = ({ title, description, url }) => {
    const imageUrl = 'https://framedle.org/thumbnail.png';
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content="FrameDle, Warframe guessing game, Warframe puzzle, Warframe challenge" />
            <meta name="robots" content="index, follow" />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={imageUrl} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />

            <link rel="canonical" href={url} />
        </Helmet>
    );
};

export default SEO;
