// api/webhook.js
// Endpoint Serverless en Vercel para el Asistente Turístico Condominio Reserva del Mar

export default async function handler(req, res) {
  // Configuración de cabeceras CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Ecosistema de Enlaces Autorizados
  const ECOSISTEMA_OFICIAL = {
    whatsapp: "https://wa.me/573138902136",
    sitioWeb: "https://reservadelmar.lovable.app/",
    googleBusiness: "https://g.co/kgs/4WkkCu9",
    youtube: "https://www.youtube.com/watch?v=hIJQkULq0y8",
    instagram: "https://www.instagram.com/reservadelmar_santamarta/",
    tiktok: "https://www.tiktok.com/@reservadelmarsantamarta",
    facebook: "https://www.facebook.com/profile.php?id=100090692259424"
  };

  if (req.method === 'POST') {
    try {
      const { fechaLlegada, fechaSalida, huespedes, mensaje, origen } = req.body || {};

      let textoWhatsapp = "¡Hola! Quisiera más información sobre la disponibilidad y tarifas en el Condominio Reserva del Mar, Santa Marta.";
      
      if (fechaLlegada && fechaSalida && huespedes) {
        textoWhatsapp = `¡Hola! Me gustaría cotizar en el Condominio Reserva del Mar:\n- Fecha de llegada: ${fechaLlegada}\n- Fecha de salida: ${fechaSalida}\n- Número de huéspedes: ${huespedes}`;
      } else if (mensaje) {
        textoWhatsapp = `¡Hola! Consulta desde la web: ${mensaje}`;
      }

      const enlaceWhatsappDirecto = `${ECOSISTEMA_OFICIAL.whatsapp}?text=${encodeURIComponent(textoWhatsapp)}`;

      return res.status(200).json({
        success: true,
        message: "Petición procesada exitosamente.",
        conversion: {
          whatsappUrl: enlaceWhatsappDirecto,
          textoMensaje: textoWhatsapp
        },
        ecosistema: ECOSISTEMA_OFICIAL,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        error: "Error interno procesando la solicitud.",
        detalles: error.message
      });
    }
  }

  return res.status(200).json({
    status: "Servicio activo",
    servicio: "Backend Asistente Turístico Condominio Reserva del Mar",
    destino: "Santa Marta, Caribe Colombiano",
    ecosistema: ECOSISTEMA_OFICIAL
  });
}
