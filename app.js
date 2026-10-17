const BACKEND_URL = 'http://localhost:3000'; // Se actualiza al desplegar el servidor en la nube

document.getElementById('btn-whatsapp').addEventListener('click', () => {
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  const guests = document.getElementById('guests').value;

  // Registrar analítica de la consulta
  fetch(`${BACKEND_URL}/api/track-action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'WHATSAPP_CLICK',
      searchData: { checkin, checkout, guests }
    })
  }).catch(() => {});

  // Construcción del mensaje pre-armado hacia WhatsApp
  const phone = '573138902136';
  const text = `Hola, vengo del *Asistente Turístico Reserva del Mar* para cotizar mi estadía frente al mar en Playa Salguero:\n\n📅 Fecha de Llegada: ${checkin || 'Por confirmar'}\n📅 Fecha de Salida: ${checkout || 'Por confirmar'}\n👥 Número de personas: ${guests}\n\n¡Quedo atento a la información y disponibilidad!`;
  
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
});
