import Head from 'next/head';

export default function HealthCheck() {
    return (
        <>
            <Head>
                <title>Health Check</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <p
                    style={{
                        color: '#fff',
                    }}
                >
                    Everything is working as expected
                </p>
            </div>
        </>
    );
}
