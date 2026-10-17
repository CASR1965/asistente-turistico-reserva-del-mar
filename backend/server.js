const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Registro temporal para estadísticas de intenciones de reserva
let stats = {
  totalVisitas: 0,
  clicsWhatsApp: 0,
  consultas: []
};

// Endpoint para registrar el clic de reserva e intenciones
app.post('/api/track-action', (req, res) => {
  const { action, searchData } = req.body;

  if (action === 'WHATSAPP_CLICK') {
    stats.clicsWhatsApp++;
    stats.consultas.push({
      fechaRegistro: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' }),
      checkin: searchData.checkin || 'Por confirmar',
      checkout: searchData.checkout || 'Por confirmar',
      guests: searchData.guests || 2
    });
  }

  console.log(`[CONVERSIÓN DIRECTA] Clic a WhatsApp enviado:`, searchData);
  res.json({ success: true, stats });
});

// Endpoint para consultar métricas y panel de control
app.get('/api/admin/stats', (req, res) => {
  res.json({
    titulo: "Panel de Analítica — Asistente Turístico Reserva del Mar",
    resumen: stats
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose correctamente en el puerto ${PORT}`);
});
