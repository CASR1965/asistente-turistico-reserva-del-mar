// app.js - Asistente Turístico Condominio Reserva del Mar (Vercel Serverless Integration)

document.addEventListener('DOMContentLoaded', () => {
  const btnWhatsapp = document.getElementById('btn-whatsapp');

  if (btnWhatsapp) {
    btnWhatsapp.addEventListener('click', async (e) => {
      e.preventDefault();

      // Captura de valores desde los inputs del HTML
      const checkin = document.getElementById('checkin')?.value || '';
      const checkout = document.getElementById('checkout')?.value || '';
      const guests = document.getElementById('guests')?.value || '1';

      // Feedback visual en el botón durante el procesamiento
      const textoOriginal = btnWhatsapp.innerText;
      btnWhatsapp.innerText = 'Procesando cotización...';
      btnWhatsapp.style.pointerEvents = 'none';

      try {
        // Enviar tracking y solicitar estructura de mensaje al endpoint serverless
        const response = await fetch('/api/webhook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fechaLlegada: checkin,
            fechaSalida: checkout,
            huespedes: guests,
            origen: 'Buscador Principal Web'
          })
        });

        const data = await response.json();

        if (data.success && data.conversion?.whatsappUrl) {
          // Redirección directa al chat de WhatsApp generado por el backend
          window.open(data.conversion.whatsappUrl, '_blank');
        } else {
          // Fallback en caso de que la respuesta no traiga la URL esperada
          lanzarWhatsAppFallback(checkin, checkout, guests);
        }

      } catch (error) {
        console.error('Error al conectar con la API:', error);
        // Fallback directo si falla la conexión a internet/servidor
        lanzarWhatsAppFallback(checkin, checkout, guests);
      } finally {
        // Restaurar estado del botón
        btnWhatsapp.innerText = textoOriginal;
        btnWhatsapp.style.pointerEvents = 'auto';
      }
    });
  }
});

// Función auxiliar para construir el enlace directo si falla la petición HTTP
function lanzarWhatsAppFallback(checkin, checkout, guests) {
  const phone = '573138902136';
  const text = `Hola, vengo del *Asistente Turístico Reserva del Mar* para cotizar mi estadía frente al mar en Playa Salguero:\n\n📅 Fecha de Llegada: ${checkin || 'Por confirmar'}\n📅 Fecha de Salida: ${checkout || 'Por confirmar'}\n👥 Número de personas: ${guests}\n\n¡Quedo atento a la información y disponibilidad!`;
  
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
}
