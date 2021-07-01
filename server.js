/**
 * *********************************
 * ****SERVEUR HTTP AVEC EXPRESS****
 * *********************************
 */

const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.normalize(`${__dirname}/public`)));

app.get('/', ( request, response, next ) => {
  return response.sendFile(path.normalize(`${__dirname}/public/index.html`));
});

let port = process.env.PORT || 8888;
const server = app.listen(port, () => {
  console.log('HTTP server started on 8888');
})

/**
 * FIN DU SERVEUR EXPRESS
 */

/**
 * ***************************************
 * ****SERVEUR WEBSOCKET AVEC SOCKETIO****
 * ***************************************
 */

const io = require('socket.io');

const wsIoServer = io(server);

wsIoServer.on('connection', (socket) => {

  let salonSelectionne;

  socket.on('choixSalon', (salon) => {
    console.log('Choix du salon', salon);
    if (salon === 'salon-1' || salon === 'salon-2' || salon === 'salon-3') {
      socket.join(salon);
      salonSelectionne = salon;
    }
  });

  socket.on('messageEnvoyeParLeNavigateur', (lesDonnees) => {
    console.log('Salon séléctionné', salonSelectionne);
    if (salonSelectionne) {
      wsIoServer.to(salonSelectionne).emit('messageEnvoyeParLeServeur', lesDonnees);
    }
  });
});

