const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const cors_origin = process.env.CORS_ORIGIN
const axios = require('axios')
const clear_cookie_domain = process.env.CLEAR_COOKIE_DOMAIN
const API_URL = process.env.API_URL

app.prepare().then(() => {
  const server = express()
  server.use(cookieParser())
  var corsOptions = {
    origin: cors_origin,
    optionsSuccessStatus: 200,
    credentials: true,
  }
  server.use(cors(corsOptions))
  server.get('/', (req, res) => {
    return res.redirect('/landing-page')
  })
  server.get('/login', async (req, res) => {
    req.query = {
      parentType: 'login',
    }
    return app.render(req, res, '/auth', req.query)
  })
  server.get('/signup', async (req, res) => {
    req.query = {
      parentType: 'signup',
    }
    return app.render(req, res, '/auth', req.query)
  })
  server.get('/landing-page', async (req, res) => {
    req.query = {
      parentType: 'landingPage',
    }
    return app.render(req, res, '/integration', req.query)
  })
  server.get('/dashboard', async (req, res) => {
    req.query = {
      parentType: 'dashboard',
    }
    return app.render(req, res, '/integration', req.query)
  })
  server.get('/settings', async (req, res) => {
    req.query = {
      parentType: 'settings',
    }
    return app.render(req, res, '/integration', req.query)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3124, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3124')
  })
})
