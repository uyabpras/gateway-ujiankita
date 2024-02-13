// loadBalancer.js
const express = require('express');
const httpProxy = require('http-proxy');
// const loginServiceRoute =  require('../routes/loginServiceRoute');
// const soalServiceRoute = require('../routes/soalServiceRoute');
// const modulServiceRoute = require('../routes/modulServiceRoute');

const app = express();
const proxy = httpProxy.createProxyServer();

const services = [
  { path: '/api/user', target: 'http://localhost:3000' },  // Menyesuaikan path dan target
  { path: '/api/soal', target: 'http://localhost:3012' },  // Menyesuaikan path dan target
  { path: '/api/modul', target: 'http://localhost:3011' }, // Menyesuaikan path dan target
  // Tambahkan service sesuai kebutuhan
];

app.all('*', (req, res) => {
  const path = req.path;

  const selectedService = services.find(service => path.startsWith(service.path));

  if (selectedService) {
    proxy.web(req, res, {
      target: selectedService.target,
    });
  } else {
    res.status(404).send('Not Found');
  }
});

// app.use('/api/user', loginServiceRoute);
// app.use('/api/soal', soalServiceRoute);
// app.use('/api/modul', modulServiceRoute);

module.exports = app;
