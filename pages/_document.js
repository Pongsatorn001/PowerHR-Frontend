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
          <title>PowerHR</title>
          <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.0/dist/semantic.min.css"></link>          
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