import nodemailer from "nodemailer";

// 🔌 Configuration SMTP Gmail via variables .env
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // smtp.gmail.com
  port: parseInt(process.env.EMAIL_PORT, 10), // 587
  secure: false, // true pour le port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 📦 Envoie l'email de confirmation de commande
export async function sendOrderEmail(to, order) {
  const html = `
    <h2>🎉 Merci pour votre commande #${order.orderNumber}</h2>
    <p><strong>Statut actuel :</strong> ${order.status}</p>
    <p><strong>Montant total :</strong> ${order.totalAmount} TND</p>
    <p><strong>Adresse de livraison :</strong><br/>
    ${order.shippingAddress.street}, ${order.shippingAddress.city}</p>
    <h3>🛍️ Articles commandés :</h3>
    <ul>
      ${order.items.map(item => `<li>${item.title} × ${item.quantity}</li>`).join("")}
    </ul>
    <p>📞 Merci pour votre confiance. L’équipe Vinylia est à votre disposition.</p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM, // ex: "Vinylia" <contact@vinylia.com>
      to,
      subject: `🎵 Vinylia - Confirmation commande #${order.orderNumber}`,
      html,
    });

    console.log("✅ Email envoyé vers :", to);
  } catch (err) {
    console.error("❌ Échec envoi email :", err.message || err);
    throw err;
  }
}

// 🚚 Envoie un email lors du changement de statut de la commande
export async function sendStatusUpdateEmail(to, order) {
  const html = `
    <h2>📦 Mise à jour de votre commande #${order.orderNumber}</h2>
    <p>🎯 Nouveau statut : <strong>${order.status}</strong></p>
    <p>Nous vous tiendrons informé jusqu’à la livraison complète. Merci pour votre fidélité.</p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject: `🔔 Vinylia - Statut commande #${order.orderNumber}`,
      html,
    });

    console.log("✅ Email de statut envoyé vers :", to);
  } catch (err) {
    console.error("❌ Erreur email statut :", err.message || err);
    throw err;
  }
}