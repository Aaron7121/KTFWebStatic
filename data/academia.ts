// ============================================================================
// CONFIGURACIÓN CENTRAL DE LA ACADEMIA - KTF
// ============================================================================
// Aquí puedes editar todos los datos reales de la academia:
// - Nombres y lemas
// - Número de WhatsApp y enlaces
// - URLs exactas de redes sociales (Instagram, Facebook, TikTok)
// - Ubicación y enlace funcional a Google Maps
// ============================================================================

export const ACADEMIA = {
  nombre: 'KTF Club de Artes Marciales & Fitness',
  nombreCorto: 'Kamikaze Thai Fight',
  eslogan: 'Club de Artes Marciales & Fitness',
  lema: 'Entrena diferente',
  ciudad: 'Quito',
  sector: 'Sector: Universidad Central',
  direccion: 'Quito - Sector: Universidad Central',
  pais: 'Ecuador',
  moneda: 'USD',

  // --------------------------------------------------------------------------
  // 📞 TELÉFONO / WHATSAPP REAL
  // --------------------------------------------------------------------------
  telefono: '+593 98 717 4926',
  whatsappVisible: '+593 98 717 4926',
  // URL para abrir chat directo en WhatsApp (formato internacional sin signos: 593987174926)
  whatsappLink: 'https://wa.me/593987174926?text=Hola%20KTF,%20deseo%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20entrenamientos',

  // --------------------------------------------------------------------------
  // 🌐 REDES SOCIALES REALES
  // 👉 AQUÍ ES DONDE DEBES COLOCAR O EDITAR LAS URLs EXACTAS DE TUS REDES:
  // --------------------------------------------------------------------------
  redes: {
    // 📸 INSTAGRAM:
    instagram: {
      usuario: 'kamikaze_thai_fight',
      visible: '@kamikaze_thai_fight',
      // Cambia esta URL si tienes un enlace directo personalizado:
      url: 'https://www.instagram.com/kamikaze_thai_fight',
    },

    // 📘 FACEBOOK:
    facebook: {
      nombre: 'Kamikaze Thai Fight Artes Marciales & Fitness',
      visible: 'Kamikaze Thai Fight Artes Marciales & Fitness',
      // 👉 COLOCA AQUÍ LA URL EXACTA DE TU PÁGINA DE FACEBOOK:
      // (Por ejemplo: 'https://www.facebook.com/tu-pagina-real')
      url: 'https://www.facebook.com/kamikazethaifight1',
    },

    // 🎵 TIKTOK:
    tiktok: {
      usuario: '@kamikaze.thai.fight',
      visible: '@kamikaze.thai.fight',
      // 👉 COLOCA AQUÍ LA URL EXACTA DE TU PERFIL DE TIKTOK:
      url: 'https://www.tiktok.com/@kamikaze.thai.fight',
    },
  },

  // Propiedad de compatibilidad directa:
  instagram: '@kamikaze_thai_fight',

  // --------------------------------------------------------------------------
  // 📍 UBICACIÓN Y GOOGLE MAPS REAL
  // --------------------------------------------------------------------------
  mapa: {
    ciudad: 'Quito',
    sector: 'Sector: Universidad Central',
    referencia: 'Quito - Sector: Universidad Central del Ecuador',
    // 👉 URL que abre la app de Google Maps en el celular o navegador web:
    googleMapsUrl: 'https://maps.google.com/?q=Kamikaze+Thai+Fight,+Quito',
    // 👉 URL embebida para el mapa interactivo funcional en la página:
    embedUrl: 'https://maps.google.com/maps?q=Kamikaze+Thai+Fight,+Quito&t=&z=16&ie=UTF8&iwloc=&output=embed',
  },

  // --------------------------------------------------------------------------
  // 💳 DATOS PARA TRANSFERENCIAS Y PAGOS (PROVISIONAL / EDITABLE)
  // --------------------------------------------------------------------------
  correoPagos: 'pagos@kamikazethaifight.com',
  banco: {
    banco: 'Banco Pichincha',
    cuenta: '2200123456',
    tipo: 'Cuenta de ahorros',
    identificacion: '1234567890001',
    titular: 'Kamikaze Thai Fight',
  },
} as const
