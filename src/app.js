const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name: 'Felipe Leça'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Felipe Leça'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpMessage: 'Help, you know I need somebody, Help!',
    title: 'Help',
    name: 'Felipe Leça'
  })
})

app.get('/weather', (req, res) => {
  res.send({
    location: 'São Paulo',
    date: '29/06/2019', 
    forecast: 'It is sunny, the temperature is 27°C'
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Felipe Leça',
    errorMessage: 'No article matches your request'
  })
})

// Setting up the 404 page (it has to be after all declared routes using the wildcard character *)
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Felipe Leça',
    errorMessage: 'No URL matches your request'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})