const next = require('next')
const express = require('express')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const compression = require('compression')
const routes = require('./routes')
const sslRedirect = require('heroku-ssl-redirect')

const handler = routes.getRequestHandler(app)

app.prepare().then(() => {
  const server = express()

  server.use(sslRedirect())
  server.use(compression())
  server.use(handler)

  const port = parseInt(process.env.PORT, 10) || 3000

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

