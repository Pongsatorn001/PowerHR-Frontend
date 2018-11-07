import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {

  static async getInitialProps (ctx) {
    const props = await Document.getInitialProps(ctx)
    return props
  }

  render () {
    const sheet = new ServerStyleSheet()
    const main = sheet.collectStyles(<Main/>)
    const styleTags = sheet.getStyleElement()
    return (
      <html>
        <Head>
          {styleTags}
        </Head>
        <body>
          <div className='root'>
            {main}
          </div>
          <NextScript />
        </body>
      </html>
    )
  }
}