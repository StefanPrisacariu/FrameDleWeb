import Error from 'next/error';
import ErrorStyle from '@/styles/components/Error.module.scss';

export default function Custom404() {
    return (
        <>
            <style jsx global>
                {`
                    div[style^='font'] h1 {
                        font-weight: 700 !important;
                        color: #fff;
                        font-style: normal;
                    }

                    div[style^='font'] h2 {
                        font-weight: 400 !important;
                        color: #fff;
                        font-style: normal;
                    }

                    div[style^='font'] {
                        flex: 1;
                        height: auto !important;
                        font-family: var(--unify-sans) !important;
                        color: #fff;
                    }
                `}
            </style>
            <div className={ErrorStyle.fd_error}>
                <Error withDarkMode={false} statusCode={404} />
            </div>
        </>
    );
}
