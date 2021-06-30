window.document.addEventListener('DOMContentLoaded', (event) => {
  const socket = io('http://127.0.0.1:8888');

  const formElement = window.document.querySelector('#formulaire');
  const selectionElement = window.document.querySelector('#selectionSalon');
  const pseudonymeElement = window.document.querySelector('#pseudonyme');
  const messageElement = window.document.querySelector('#message');
  const salonElement = window.document.querySelector('#salon');


  selectionElement.addEventListener('change', (event) => {
    const salon = selectionElement[selectionElement.selectedIndex].value;
    console.log('Salon choisi', salon);
    socket.emit('choixSalon', salon);
  });

  formElement.addEventListener('submit', (event) => {
    event.preventDefault();

    const donneesAEnvoyer = {
      pseudonyme: pseudonymeElement.value,
      message: messageElement.value
    };

    console.log('message envoyé par le navigateur', donneesAEnvoyer)
    socket.emit('messageEnvoyeParLeNavigateur', donneesAEnvoyer);
  });

  socket.on('messageEnvoyeParLeServeur', (message) => {
    console.log('Message reçu depuis le serveur', message);
    salonElement.innerHTML += `<p><b>${message.pseudonyme} dit:</b> <i>${message.message}</i></p>`;
  });
});