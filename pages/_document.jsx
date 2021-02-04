import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="pl">
        <Head>
            <meta name="description" content="System przeprowadzania zawodów w programowaniu zespołowym dla Politechniki Wrocławskiej.Projektowanie oprogramowania 2020/2021 - projekt zaliczeniowy Karol Sitarz i Jakub Budzyński." /> 
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap" rel="stylesheet" />
        </Head>
        <body className="bg-gray-100 text-gray-700">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
