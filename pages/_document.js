import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                    {// No need if added as a config file src/firebase.js
                        /* <script src="/__/firebase/8.1.2/firebase-app.js"></script>
                    <script src="/__/firebase/8.1.2/firebase-analytics.js"></script>
                    <script src="/__/firebase/init.js"></script> */
                    }
                </body>
            </Html>
        )
    }
}

export default MyDocument