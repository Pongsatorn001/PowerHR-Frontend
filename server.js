const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'

const next = require('next')
const mobxReact = require('mobx-react')
const app = next({ dev })
const handle = app.getRequestHandler()
const express = require('express')

mobxReact.useStaticRendering(true)

app.prepare()
.then(() => {
  const server = express()
  
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});